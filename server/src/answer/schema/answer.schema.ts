import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../user/schema/user.schema";
import { Question } from "../../question/schema/question.schema";
import * as mongoose from "mongoose";
import { Reply } from "../../reply/schema/reply.schema";

export type AnswerDocument = mongoose.HydratedDocument<Answer | null>;

@Schema({ timestamps: true, collection: "Answer", selectPopulatedPaths: true })
export class Answer {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	answeredBy: User;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: "Question",
	})
	answeredIn: Question;

	@Prop({ required: true })
	body: string[];

	@Prop({
		default: [],
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	})
	likedBy: User[];

	@Prop({
		default: [],
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	})
	dislikedBy: User[];

	@Prop({ default: 0 })
	rating: number;

	@Prop({
		default: [],
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Reply",
			},
		],
	})
	replies: Reply[];

	@Prop({ default: false })
	isSolved: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
