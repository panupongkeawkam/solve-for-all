import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { Question } from "src/question/schema/question.schema";
import * as mongoose from "mongoose";

export type AnswerDocument = HydratedDocument<Answer | null>;

@Schema({ timestamps: true, collection: "Answer" })
export class Answer {
	@Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
	answeredBy: User;

	@Prop({
		require: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "Question",
	})
	answeredIn: Question;

	@Prop({ required: true, minlength: 6 })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	body: string[];

	@Prop({
		default: [],
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	})
	likedBy: User[];

	@Prop({
		default: [],
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	})
	dislikedBy: User[];

	@Prop({ default: 0 })
	rating: number;

	@Prop({ default: [] })
	replies: string[];

	@Prop({ default: false })
	isSolved: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);