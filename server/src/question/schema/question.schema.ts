import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Tag } from "../../tag/schema/tag.schema";
import { User } from "../../user/schema/user.schema";
import { Answer } from "../../answer/schema/answer.schema";

export type QuestionDocument = mongoose.HydratedDocument<Question | null>;

@Schema({
	timestamps: true,
	collection: "Question",
	selectPopulatedPaths: true,
})
export class Question {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	createdBy: User;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	body: string[];

	@Prop({ default: 0 })
	viewed: number;

	@Prop({ default: 0 })
	rating: number;

	@Prop({ default: 0 })
	answered: number;

	@Prop({
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		default: [],
	})
	likedBy: User[];

	@Prop({
		default: 0,
	})
	participant: number;

	@Prop({
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		default: [],
	})
	dislikedBy: User[];

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: "Answer",
	})
	solvedBy: Answer;

	@Prop({
		default: [],
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tag",
			},
		],
	})
	tags: Tag[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
