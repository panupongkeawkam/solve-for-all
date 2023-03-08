import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Question } from "./schema/question.schema";
import { Model } from "mongoose";

@Injectable()
export class QuestionService {
	constructor(
		@InjectModel(Question.name)
		private questionModel: Model<Question | null>,
	) {}

	async createQuestion({
		createdBy,
		title,
		bodyDto,
		tagsId,
	}: any): Promise<any> {
		try {
			const newQuestion = new this.questionModel({
				title: title,
				createdBy: createdBy,
				body: bodyDto,
				tags: tagsId,
			});
			return newQuestion;
		} catch (err) {
			console.log(err);
			throw new BadRequestException("Please provide all values");
		}
	}
}
