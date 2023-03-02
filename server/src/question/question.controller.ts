import {
	Controller,
	Post,
	Res,
	Req,
	UseGuards,
	UseInterceptors,
	UploadedFiles,
	HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
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
	) {
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

		try {
			const uploadedFiles = await this.fileService.fileUploads(params);
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
			res.status(HttpStatus.CREATED).json({
				question: newQuestionDocument,
			});
		} catch (err) {
			console.log(err);
		}
	}
}
