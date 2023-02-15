import {
	Post,
	Get,
    Body,
	Res,
	HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Controller } from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { CreateAnswerDto } from "./Dto/createAnswer.dto";

@Controller("answer")
export class AnswerController {
    constructor(
		private answerService: AnswerService,
	) {}
    
	@Get()
	getUser(@Res() res: Response) {
		res.status(HttpStatus.OK).json({
			msg: "Hi Answer",
		});
	}
    @Post()
    async createAnswer(@Body() body: CreateAnswerDto, @Res() res: Response) {
		const answer = await this.answerService.createAnswer({
			...body,
		});
		res.status(HttpStatus.CREATED).json({ answer });
	}
}