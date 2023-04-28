import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Question } from "./schema/question.schema";
import { Model } from "mongoose";
import { CreateQuestionDto } from "./dto/createQuestion.dto";
import { DeleteQuestionDto } from "./dto/deleteQuestion.dto";
import { InteractWithQuestionDto } from "./dto/interactQuestion.dto";
import { SolveQuestionDto } from "./dto/confirmSolve.dto";

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

	async IncreaseAnsweredAndParticipant(query: string): Promise<void> {
		await this.questionModel.findOneAndUpdate(
			{
				_id: query,
			},
			{
				$inc: {
					answered: 1,
					participant: 1,
				},
			},
			{
				new: true,
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
					participant: 1,
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

	// Find 10 questions is ordering by the most participant.
	async findAllQuestion(): Promise<Question[] | null> {
		return await this.questionModel.find({}).sort({ participant: 1 });
	}

	// Find questions by question ids
	async findQuestions(query: string[]): Promise<Question[] | null> {
		return await this.questionModel
			.find({
				_id: query,
			})
			.sort({ participant: 1 });
	}

	async findQuestionsByUserId(query: string): Promise<Question[] | null> {
		return await this.questionModel
			.find({
				createdBy: query,
			})
			.sort({ participant: 1 });
	}

	async solvedQuestion(query: SolveQuestionDto): Promise<Question | null> {
		try {
			return await this.questionModel.findOneAndUpdate(
				{
					_id: query._id,
				},
				{
					solvedBy: query.answerId,
					$inc: {
						participant: 1,
					},
				},
				{
					new: true,
				},
			);
		} catch (err) {
			throw new InternalServerErrorException("Something went wrong.");
		}
	}

	async increaseParticipant(query: string): Promise<void> {
		await this.questionModel.findOneAndUpdate(
			{
				_id: query,
			},
			{
				$inc: {
					participant: 1,
				},
			},
		);
	}

	async findManyQuestions(query: string[]): Promise<Question[] | null> {
		return await this.questionModel.find({
			_id: {
				$in: query,
			},
		});
	}
}
