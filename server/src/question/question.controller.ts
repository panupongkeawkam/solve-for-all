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
	InternalServerErrorException,
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
import {
	previewAnswerFormat,
	previewQuestionFormat,
	previewReplyFormat,
} from "../utils/formatter.utils";
import { InteractWithQuestionDto } from "./dto/interactQuestion.dto";
import { ReputationQueryDto } from "src/dto/reputationQuery.dto";
import { PreviewQuestionDto } from "./dto/previewQuestion.dto";
import { AnswerService } from "src/answer/answer.service";
import { ReplyService } from "src/reply/reply.service";
import { PreviewReplyDto } from "src/reply/dto/previewReply.dto";

@Controller("questions")
export class QuestionController {
	constructor(
		private readonly questionService: QuestionService,
		private readonly tagService: TagService,
		private readonly fileService: FileService,
		private readonly userService: UserService,
		private readonly answerService: AnswerService,
		private readonly replyService: ReplyService,
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

		const query = files?.map((file) => {
			return {
				buffer: file.buffer,
				fileName: file.originalname,
			};
		});

		const existTags = await findExistTags(tags);
		const uploadedFiles = await this.fileService.fileUploads(query);
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
			throw new InternalServerErrorException("Something went wrong.");
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
			const response: any = previewQuestionFormat(
				question,
				createdBy,
				tags,
			);

			const answers: any =
				await this.answerService.findAnswersByQuestionId(
					req.params?.id,
				);

			const answerResponse = await Promise.all(
				answers?.map(async (answer) => {
					const user = await this.userService.findUserByUserIdLess(
						answer?.answeredBy,
					);
					const repliesQuery = answer?.replies.map((reply) =>
						reply.toString(),
					);
					const replies = await this.replyService.findManyReplies(
						repliesQuery,
					);
					const repliesResponse: PreviewReplyDto[] =
						await Promise.all(
							replies.map(async (reply) => {
								const user =
									await this.userService.findUserByUserIdLess(
										reply.repliedBy.toString(),
									);
								return previewReplyFormat(user, reply);
							}),
						);
					let response: any = previewAnswerFormat(user, answer);
					response.replies = repliesResponse;
					return response;
				}),
			);

			response.answers = answerResponse;

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
				_id: question.createdBy.toString(),
				reputation: isLike ? 1 : -1,
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

	@UseGuards(JwtAuthGuard)
	@Put(":id/solved")
	async confirmSolved(
		@Req() req: any,
		@Res() res: Response,
	): Promise<Response> {
		try {
			const query = {
				_id: req.params.id,
				answerId: req.body.answerId,
			};
			const question = await this.questionService.solvedQuestion(query);

			if (!question)
				throw new BadRequestException(
					"Your answer doesn't exists anymore.",
				);

			const userReputationQuery = {
				_id: req.body.answerOwnerId,
				reputation: 10,
			};

			// Background
			this.userService.reputationCompute(userReputationQuery);
			this.userService.increaseSolved(req.body.answerOwnerId);
			this.answerService.confirmAnswerSolved(req.body.answerId);

			return res.status(HttpStatus.OK).json({
				success: true,
			});
		} catch (err) {
			console.log(
				"error from question controller confirm solved function.",
			);
			console.log(err);
			throw new InternalServerErrorException("Something went wrong.");
		}
	}
}
