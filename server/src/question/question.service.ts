import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Question } from "./schema/question.schema";
import { Model } from "mongoose";
import { CreateQuestionDto } from "./dto/createQuestion.dto";
import { DeleteQuestionDto } from "./dto/deleteQuestion.dto";
import { InteractWithQuestionDto } from "./dto/interactQuestion.dto";

@Injectable()
export class QuestionService {
	constructor(
		@InjectModel(Question.name)
		private questionModel: Model<Question>,
	) {}

	// Create new question
	async createQuestion(query: CreateQuestionDto): Promise<any | null> {
		try {
			const newQuestion = new this.questionModel({
				title: query.title,
				createdBy: query.createdBy,
				body: query.bodyDto,
				tags: query.tagsId,
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

	// Find question by question id then delete question
	async findQuestionAndDelete(
		query: DeleteQuestionDto,
	): Promise<Question | null> {
		const status = await this.questionModel.findOneAndDelete({
			_id: query._id,
			createdBy: query.userId,
		});
		return status;
	}

	// Increase view when click to see detail
	async increaseView(query: string): Promise<void> {
		await this.questionModel.findOneAndUpdate(
			{
				_id: query,
			},
			{
				$inc: {
					viewed: 1,
				},
			},
		);
	}

	async findOneAndInteract(
		query: InteractWithQuestionDto,
	): Promise<Question | null> {
		const question = await this.questionModel.findOneAndUpdate(
			{
				_id: query._id,
			},
			{
				$inc: {
					participant: query.payload.participant,
					rating: query.payload.rating,
				},
				$push: {
					[query.payload.action]: query.userId,
				},
			},
			{
				new: true,
			},
		);
		return question;
	}
}
