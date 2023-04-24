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

	// Create answer
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

	// Find answers by question id
	async findAnswersByQuestionId(query: string): Promise<Answer[] | null> {
		try {
			return await this.answerModel
				.find({
					answeredIn: query,
				})
				.sort({
					createdAt: 1,
				})
				.select({
					updatedAt: 0,
				});
		} catch (err) {
			console.log(
				"error from answer service find answers by question id",
			);
			console.log(err);
			throw new InternalServerErrorException("Something went wrong.");
		}
	}

	// Find answer and change to solve status
	async confirmAnswerSolved(query: string): Promise<void> {
		await this.answerModel.findOneAndUpdate(
			{
				_id: query,
			},
			{
				isSolved: true,
			},
			{
				new: true,
			},
		);
	}
}
