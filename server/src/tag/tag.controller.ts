import {
	Controller,
	Get,
	Req,
	Res,
	HttpStatus,
	BadRequestException,
	InternalServerErrorException,
	Inject,
	forwardRef,
	UseGuards,
	UnauthorizedException,
} from "@nestjs/common";
import { TagService } from "./tag.service";
import { Response, Request } from "express";
import { QuestionService } from "../question/question.service";
import { PreviewQuestionDto } from "../question/dto/previewQuestion.dto";
import { UserService } from "../user/user.service";
import { previewQuestionFormat } from "../question/utils/formatter.util";
import { PreviewTagDto } from "./dto/previewTag.dto";
import { previewTagFormat } from "./utils/formatter.util";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { shuffle } from "./utils/shuffle.util";

@Controller("tags")
export class TagController {
	constructor(
		private readonly tagService: TagService,
		@Inject(forwardRef(() => QuestionService))
		private readonly questionService: QuestionService,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
	) {}

	@Get()
	async getAllTags(
		@Res() res: Response,
		@Req() req: Request,
	): Promise<Response | null> {
		try {
			const tags = await this.tagService.getAllTags();
			return res.status(HttpStatus.OK).json({
				tags,
			});
		} catch (err) {
			throw new InternalServerErrorException("Something went wrong");
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get("interested")
	async filterInterestedTags(
		@Req() req: any,
		@Res() res: Response,
	): Promise<Response> {
		const user = await this.userService.findUserByUserId(req?.user?._id);

		if (!user) {
			throw new UnauthorizedException("You are unauthorize.");
		}

		try {
			const tagsQuery = user.tags.map((tag) => tag.toString());
			const tags = await this.tagService.findManyTagsWithQuestions(
				tagsQuery,
			);

			let questionsId = [];
			tags.forEach((tag) => {
				const questions = tag.questions.map((question) =>
					question.toString(),
				);
				const shuffleQuestionsId = shuffle(questions);
				questionsId = [...questionsId, ...shuffleQuestionsId];
			});

			const setOfQuestionsId = [...new Set(questionsId)];

			const questions = await this.questionService.findManyQuestions(
				setOfQuestionsId,
			);

			const responses: PreviewQuestionDto[] = await Promise.all(
				questions.map(async (question) => {
					const createdBy =
						await this.userService.findUserByUserIdLess(
							question.createdBy.toString(),
						);
					const questionTagsQuery = question.tags.map((tag) =>
						tag.toString(),
					);
					const questionTags = await this.tagService.findManyTags(
						questionTagsQuery,
					);
					return previewQuestionFormat(
						question,
						createdBy,
						questionTags,
					);
				}),
			);

			return res.status(HttpStatus.OK).json({
				questions: responses,
			});
		} catch (err) {
			throw new InternalServerErrorException("Something went wrong.");
		}
	}

	@Get(":id")
	async getTagByTagId(@Req() req: Request, @Res() res: Response) {
		try {
			const tag = await this.tagService.findTagByTagId(req.params?.id);

			if (!tag) {
				throw new BadRequestException("Tag doesn't exists anymore");
			}

			const questionQuery = tag?.questions.map((question) =>
				question.toString(),
			);

			const questions = await this.questionService.findQuestions(
				questionQuery,
			);

			const questionsDto: PreviewQuestionDto[] = await Promise.all(
				questions.map(async (question) => {
					const tagQuery = question.tags?.map((tag) =>
						tag.toString(),
					);
					const tags = await this.tagService.findManyTags(tagQuery);
					const user = await this.userService.findUserByUserIdLess(
						question.createdBy.toString(),
					);
					return previewQuestionFormat(question, user, tags);
				}),
			);

			const response: PreviewTagDto = previewTagFormat(tag, questionsDto);

			return res.status(HttpStatus.OK).json({
				tag: response,
			});
		} catch (err) {
			throw new InternalServerErrorException("Something went wrong.");
		}
	}
}
