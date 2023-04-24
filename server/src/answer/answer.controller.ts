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
} from "@nestjs/common";
import { Response } from "express";
import { AnswerService } from "./answer.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/file/file.service";
import { CreateAnswerDto } from "./dto/createAnswer.dto";
import { UserService } from "src/user/user.service";
import { QuestionService } from "src/question/question.service";

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
		console.log(questionDetail);
		console.log(bodies);
		console.log(files);

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

			// Background

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
			console.log("error from answer controller create answer function.");
			console.log(err);
			throw new InternalServerErrorException("Something went wrong.");
		}
		return;
	}
}
