import {
	Controller,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
	Post,
	UploadedFiles,
	InternalServerErrorException,
	HttpStatus,
	Put,
} from "@nestjs/common";
import { Response } from "express";
import { AnswerService } from "./answer.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";
import { CreateAnswerDto } from "./dto/createAnswer.dto";
import { UserService } from "../user/user.service";
import { QuestionService } from "../question/question.service";
import { InteractAnswerQueryDto } from "./dto/interactQuery.dto";

@Controller("answers")
export class AnswerController {
	constructor(
		private answerService: AnswerService,
		private fileService: FileService,
		private userService: UserService,
		private questionService: QuestionService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	@UseInterceptors(
		FilesInterceptor("images", 6, {
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
					cb(null, false);
				}
				cb(null, true);
			},
		}),
	)
	async createAnswer(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Req() req: any,
		@Res() res: Response,
	): Promise<Response | null> {
		const questionDetail = JSON.parse(req.body.question);
		const bodies = JSON.parse(req.body.body);

		const query = files?.map((file) => {
			return {
				buffer: file.buffer,
				fileName: file.originalname,
			};
		});

		const uploadedFiles = await this.fileService.fileUploads(query);
		try {
			let index = 0;
			bodies.forEach((body) => {
				if (body.type === "image") {
					body.image = uploadedFiles[index].path;
					index = index + 1;
				}
			});

			const query: CreateAnswerDto = {
				questionDetail: {
					_id: questionDetail._id,
				},
				body: bodies,
				userId: req.user?._id,
			};
			const answer = await this.answerService.createAnswer(query);

			this.userService.answeredCompute(req.user?._id);
			this.questionService.IncreaseAnsweredAndParticipant(
				questionDetail?._id,
			);

			return res.status(HttpStatus.CREATED).json({
				answer,
			});
		} catch (err) {
			if (files.length > 0) {
				await this.fileService.removeFiles(uploadedFiles);
			}
			throw new InternalServerErrorException("Something went wrong.");
		}
	}

	@UseGuards(JwtAuthGuard)
	@Put(":id")
	async likeAnswer(@Req() req: any, @Res() res: Response): Promise<Response> {
		try {
			const isLike = req.query.like.toLowerCase() === "true";
			const query: InteractAnswerQueryDto = {
				_id: req.params?.id,
				userId: req.user?._id,
				rating: isLike ? 1 : -1,
			};

			const answer = await this.answerService.findOneAndInteract(query);
			const userReputationQuery = {
				_id: answer.answeredBy.toString(),
				reputation: isLike ? 1 : -1,
			};

			this.questionService.increaseParticipant(
				answer.answeredIn.toString(),
			);
			this.userService.reputationCompute(userReputationQuery);

			return res.status(HttpStatus.OK).json({
				success: true,
			});
		} catch (err) {
			throw new InternalServerErrorException("Something went wrong.");
		}
	}
}
