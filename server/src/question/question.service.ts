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

	async createQuestion(createdById: string): Promise<any> {
		const title: string = "Hello";
		const description: string = "How are you";
		const body: string[] = ["HI", "HI"];
		try {
			return await this.questionModel.create({
				createdBy: createdById,
				title,
				description,
				body,
			});
		} catch (err) {
			console.log(err);
			throw new BadRequestException("Please provide all valyes");
		}
	}
}
