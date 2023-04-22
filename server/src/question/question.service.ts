import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Question } from "./schema/question.schema";
import { Model } from "mongoose";
import { CreateQuestionDto } from "./dto/create.dto";

@Injectable()
export class QuestionService {
	constructor(
		@InjectModel(Question.name)
		private questionModel: Model<Question>,
	) {}

	// Create new question
	async createQuestion(question: CreateQuestionDto): Promise<any | null> {
		try {
			const newQuestion = new this.questionModel({
				title: question.title,
				createdBy: question.createdBy,
				body: question.bodyDto,
				tags: question.tagsId,
			});
			return newQuestion;
		} catch (err) {
			console.log(err);
			throw new BadRequestException("Please provide all values");
		}
	}

	// Find question by question id
	async findQuestionByQuestionId(_id: string): Promise<Question | null> {
		const question = await this.questionModel.findById(_id);
		if (question) {
			return question;
		}
		return null;
	}
}
