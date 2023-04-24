import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Answer } from "./schema/answer.schema";
import { CreateAnswerDto } from "./dto/createAnswer.dto";

@Injectable()
export class AnswerService {
	constructor(
		@InjectModel(Answer.name)
		private readonly answerModel: Model<Answer | null>,
	) {}

	async createAnswer(query: CreateAnswerDto): Promise<Answer | null> {
		try {
			const answer = await new this.answerModel({
				answeredIn: query.questionDetail._id,
				answeredBy: query.userId,
				body: query.body,
			});
			return await answer.save();
		} catch (err) {
			console.log("error from answer service create answer function.");
			console.log(err);
			throw new InternalServerErrorException("Something went wrong.");
		}
	}
}
