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
import { QuestionService } from "src/question/question.service";
import { UserService } from "src/user/user.service";
import { AnswerService } from "src/answer/answer.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateReplyDto } from "./dto/createReply.dto";
import { PushReplyToAnswer } from "src/dto/pushReplyQuery.dto";

@Controller("replies")
export class ReplyController {
	constructor(
		private replyService: ReplyService,
		private questionService: QuestionService,
		private userService: UserService,
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

			// Background
			this.questionService.increaseParticipant(req.body.questionId);
			this.answerService.pushReplyToAnswer(query);

			return res.status(HttpStatus.OK).json({
				reply: reply,
			});
		} catch (err) {
			console.log("error from reply controller create reply function.");
			console.log(err);
			throw new InternalServerErrorException("Something went wrong.");
		}
	}
}
