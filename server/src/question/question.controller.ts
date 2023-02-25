import {
	Controller,
	Post,
	Res,
	Req,
	UseGuards,
	HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { QuestionService } from "./question.service";

@Controller("questions")
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	createQuestion(@Req() req: any, @Res() res: Response) {
		const createdData = this.questionService.createQuestion(req.user._id);
		res.status(HttpStatus.CREATED).json({
			createdData,
		});
	}
}
