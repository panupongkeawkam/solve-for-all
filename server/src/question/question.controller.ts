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
} from "@nestjs/common";
import { Response, Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { QuestionService } from "./question.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { TagService } from "../tag/tag.service";
import { findExistTags, findNotExistTags } from "./utils/filter.util";
import { FileService } from "src/file/file.service";
import { BadRequestException } from "@nestjs/common";

@Controller("questions")
export class QuestionController {
	constructor(
		private readonly questionService: QuestionService,
		private readonly tagService: TagService,
		private readonly fileService: FileService,
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

			newQuestionDocument.tags = [
				...newQuestionDocument.tags,
				...newTags,
			];
			newQuestionDocument.save();

			if (existTags > 0) {
				await this.tagService.addQuestionOrUserIdToTag(
					existTags,
					newQuestionDocument._id,
					"question",
				);
			}
			return res.status(HttpStatus.CREATED).json({
				question: newQuestionDocument,
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
		const question = await this.questionService.findQuestionByQuestionId(
			req.params?.id,
		);
		if (question) {
			return res.status(HttpStatus.OK).json({ question });
		}
		throw new BadRequestException("Question doesn't exist anymore.");
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	async deleteQuestion(
		@Req() req: any,
		@Res() res: Response,
	): Promise<Response> {
		const status = await this.questionService.findQuestionAndDelete(
			req.params?.id,
			req?.user?._id,
		);
		if (status) {
			return res.status(HttpStatus.OK).json({
				success: true,
			});
		}
		throw new BadRequestException("You are unauthorize.");
	}
}
