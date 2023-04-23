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
import { previewFormat } from "./utils/formatter.utls";
import { InteractWithQuestionDto } from "./dto/interactQuestion.dto";

@Controller("questions")
export class QuestionController {
	constructor(
		private readonly questionService: QuestionService,
		private readonly tagService: TagService,
		private readonly fileService: FileService,
		private readonly userService: UserService,
	) {}

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

			if (existTags > 0) {
				await this.tagService.addQuestionOrUserIdToTag(
					existTags,
					newQuestionDocument._id,
					"question",
				);
			}

			const userDetail = await this.userService.findUserByUserIdLess(
				newQuestionDocument.createdBy.toString(),
			);

			const response = previewFormat(
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
			const response = previewFormat(question, createdBy, tags);
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
		const status = await this.questionService.findQuestionAndDelete(query);
		if (status) {
			return res.status(HttpStatus.OK).json({
				success: true,
			});
		}
		throw new BadRequestException("You are unauthorize.");
	}

	// like question by question id Not return yet
	@UseGuards(JwtAuthGuard)
	@Put(":id/liked")
	async likeQuestion(@Req() req: any, @Res() res: Response): Promise<void> {
		const query: InteractWithQuestionDto = {
			_id: req.params.id,
			userId: req.user?._id,
			payload: {
				participant: 1,
				rating: 1,
				action: "likedBy",
			},
		};
		const question = await this.questionService.findOneAndInteract(query);
		console.log(question);
	}

	// dislike question by question id Not return yet
	@UseGuards(JwtAuthGuard)
	@Put(":id/disliked")
	async dislikeQuestion(
		@Req() req: any,
		@Res() res: Response,
	): Promise<void> {
		const query: InteractWithQuestionDto = {
			_id: req.params.id,
			userId: req.user._id,
			payload: {
				participant: 1,
				rating: -1,
				action: "dislikedBy",
			},
		};
		const question = await this.questionService.findOneAndInteract(query);
		console.log(question);
	}
}
