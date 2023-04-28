import {
	Controller,
	Post,
	UseGuards,
	Req,
	Res,
	InternalServerErrorException,
	HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { ReplyService } from "./reply.service";
import { QuestionService } from "../question/question.service";
import { AnswerService } from "../answer/answer.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateReplyDto } from "./dto/createReply.dto";
import { PushReplyToAnswer } from "../answer/dto/pushReplyQuery.dto";

@Controller("replies")
export class ReplyController {
	constructor(
		private replyService: ReplyService,
		private questionService: QuestionService,
		private answerService: AnswerService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createReply(
		@Req() req: any,
		@Res() res: Response,
	): Promise<Response> {
		try {
			const replyQuery: CreateReplyDto = {
				repliedBy: req?.user?._id,
				repliedIn: req.body.repliedIn,
				message: req.body.message,
			};
			const reply: any = await this.replyService.createReply(replyQuery);
			const query: PushReplyToAnswer = {
				_id: req.body.repliedIn,
				replyId: reply._id.toString(),
			};

			this.questionService.increaseParticipant(req.body.questionId);
			this.answerService.pushReplyToAnswer(query);

			return res.status(HttpStatus.OK).json({
				reply: reply,
			});
		} catch (err) {
			throw new InternalServerErrorException("Something went wrong.");
		}
	}
}
