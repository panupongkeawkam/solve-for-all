import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Tag } from "../../tag/schema/tag.schema";
import { User } from "../../user/schema/user.schema";

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

	@Prop({
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				unique: true,
			},
		],
		default: [],
	})
	likedBy: User[];

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
		ref: "User",
	})
	solvedBy: User;

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
