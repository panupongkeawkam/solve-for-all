import {
	BadRequestException,
	Injectable,
} from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Answer } from "src/answer/Schema/answer.schema";
import { Model } from "mongoose";
import { CreateAnswerDto } from "src/answer/Dto/createAnswer.dto";

@Injectable()
export class AnswerService {
	constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) {}

	// receive POST method
	async createAnswer(createAnswerDto: CreateAnswerDto): Promise<any> {
		try {
			const answer: any = await this.answerModel.create(createAnswerDto);
			console.log(answer);
			
			const { createdAt, updatedAt, ...rest } = answer?._doc;
			return rest;
		} catch (error) {
			throw "catch error 2"
		}
	}

}
