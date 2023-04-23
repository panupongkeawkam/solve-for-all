import {
	Controller,
	Post,
	Res,
	Req,
	UseGuards,
	UseInterceptors,
	UploadedFiles,
	HttpStatus,
	Get,
	Delete,
	Put,
	BadGatewayException,
	UnauthorizedException,
} from "@nestjs/common";
import { Response, Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { QuestionService } from "./question.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { TagService } from "../tag/tag.service";
import { findExistTags, findNotExistTags } from "./utils/filter.util";
import { FileService } from "src/file/file.service";
import { BadRequestException } from "@nestjs/common";
import { DeleteQuestionDto } from "./dto/deleteQuestion.dto";
import { UserService } from "src/user/user.service";
import { previewQuestionFormat } from "../utils/formatter.utils";
import { InteractWithQuestionDto } from "./dto/interactQuestion.dto";
import { ReputationQueryDto } from "src/dto/reputationQuery.dto";
import { PreviewQuestionDto } from "./dto/previewQuestion.dto";

@Controller("questions")
export class QuestionController {
	constructor(
		private readonly questionService: QuestionService,
		private readonly tagService: TagService,
		private readonly fileService: FileService,
		private readonly userService: UserService,
	) {}

	@Get()
	async findAllQuestion(
		@Req() req: Request,
		@Res() res: Response,
	): Promise<Response | null> {
		try {
			const questions = await this.questionService.findAllQuestion();

			const responses: PreviewQuestionDto[] = await Promise.all(
				questions.map(async (question) => {
					const user = await this.userService.findUserByUserIdLess(
						question?.createdBy.toString(),
					);
					const tagQuery = question?.tags.map((tag) =>
						tag.toString(),
					);
					const tags = await this.tagService.findManyTags(tagQuery);
					return previewQuestionFormat(question, user, tags);
				}),
			);
			if (responses) {
				return res.status(HttpStatus.OK).json({
					questions: responses,
				});
			}
		} catch (err) {
			console.log(
				`Error from question controller find all question function`,
			);
			console.log(err);
			throw new BadRequestException("Something when wrong on server.");
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	@UseInterceptors(
		FilesInterceptor("images", 6, {
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
					return cb(null, false);
				}
				cb(null, true);
			},
		}),
	)
	async createQuestion(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Req() req: any,
		@Res() res: Response,
	): Promise<Response> {
		const tags = JSON.parse(req.body?.tags);
		const bodies = JSON.parse(req.body?.body);
		const title = JSON.parse(req.body?.title).trim();
		const createdBy = req.user?._id;

		if (!title) {
			throw new BadRequestException("Title cannot be empty.");
		}

		const params = files?.map((file) => {
			return {
				buffer: file.buffer,
				fileName: file.originalname,
			};
		});

		const existTags = await findExistTags(tags);

		const uploadedFiles = await this.fileService.fileUploads(params);
		try {
			let index = 0;
			bodies.forEach((body) => {
				if (body.type === "image") {
					body.image = uploadedFiles[index].path;
					index = index + 1;
				}
			});

			const newQuestionDocument =
				await this.questionService.createQuestion({
					createdBy,
					title,
					bodyDto: bodies,
					tagsId: existTags,
				});
			const notExistTags = findNotExistTags(
				tags,
				newQuestionDocument._id,
			);

			const newTags = await this.tagService.createNewTags(notExistTags);
			const newTagsId = newTags.map((tag) => tag._id);

			newQuestionDocument.tags = [
				...newQuestionDocument.tags,
				...newTagsId,
			];
			newQuestionDocument.save();

			if (existTags.length > 0) {
				await this.tagService.addQuestionOrUserIdToTag(
					existTags,
					newQuestionDocument._id,
					"question",
				);
			}

			const userDetail = await this.userService.findUserByUserIdLess(
				newQuestionDocument.createdBy.toString(),
			);

			const response = previewQuestionFormat(
				newQuestionDocument,
				userDetail,
				newTags,
			);

			return res.status(HttpStatus.CREATED).json({
				question: response,
			});
		} catch (err) {
			if (files.length > 0) {
				await this.fileService.removeFiles(uploadedFiles);
			}
			console.log(err);
			throw new BadRequestException("Please provide the values");
		}
	}

	// Find question by question id
	@Get(":id")
	async getQuestion(
		@Req() req: Request,
		@Res() res: Response,
	): Promise<Response> {
		const question: any =
			await this.questionService.findQuestionByQuestionId(req.params?.id);
		if (question) {
			const tagQuery = question.tags.map((tag) => tag.toString());
			const tags = await this.tagService.findManyTags(tagQuery);
			const createdBy = await this.userService.findUserByUserIdLess(
				question.createdBy.toString(),
			);
			const response = previewQuestionFormat(question, createdBy, tags);

			// increase viewed
			this.questionService.increaseView(question?._id.toString());
			return res.status(HttpStatus.OK).json({ question: response });
		}
		throw new BadRequestException("Question doesn't exist anymore.");
	}

	// Delete question by question id
	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	async deleteQuestion(
		@Req() req: any,
		@Res() res: Response,
	): Promise<Response> {
		const query: DeleteQuestionDto = {
			_id: req.params?.id,
			userId: req?.user?._id,
		};
		const question: any = await this.questionService.findQuestionAndDelete(
			query,
		);
		const questionTags = question?.tags.map((tag) => tag.toString());
		this.tagService.pullQuestionIdFromTag(questionTags, question._id);
		if (question) {
			return res.status(HttpStatus.OK).json({
				success: true,
			});
		}
		throw new UnauthorizedException("You are unauthorize.");
	}

	// like and dislike question by question id Not return yet
	@UseGuards(JwtAuthGuard)
	@Put(":id")
	async likeQuestion(
		@Req() req: any,
		@Res() res: Response,
	): Promise<Response> {
		try {
			const isLike = req.query.like.toLowerCase() === "true";
			const isLikeQuery: InteractWithQuestionDto = {
				_id: req.params.id,
				userId: req.user?._id,
				payload: {
					participant: isLike ? 1 : -1,
					rating: isLike ? 1 : -1,
					action: isLike ? "likedBy" : "dislikedBy",
				},
			};
			const question = await this.questionService.findOneAndInteract(
				isLikeQuery,
			);

			// behind screen work
			if (!question)
				throw new BadRequestException(
					"Question doesn't exists anymore.",
				);

			const reputationQuery: ReputationQueryDto = {
				_id: req?.user?._id,
				createdBy: question.createdBy.toString(),
				isLike,
			};

			this.userService.reputationCompute(reputationQuery);
			return res.status(HttpStatus.OK).json({
				success: true,
			});
		} catch (err) {
			console.log(
				`Error from question controller like question functional`,
			);
			console.log(err);
			throw new BadGatewayException("something went wrong from server");
		}
	}
}
