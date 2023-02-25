import { Controller } from "@nestjs/common";
import { AnswerService } from "./answer.service";

@Controller("answers")
export class AnswerController {
	constructor(private answerService: AnswerService) {}
}
