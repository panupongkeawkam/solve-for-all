import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/user/schema/user.schema";
import { Tag } from "../../tag/schema/tag.schema";

export type QuestionDocument = mongoose.HydratedDocument<Question | null>;

@Schema({
	timestamps: true,
	collection: "Question",
	selectPopulatedPaths: true,
})
export class Question {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
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
			{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
		],
		default: [],
	})
	likedBy: User[];

	@Prop({
		type: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
		],
		default: [],
	})
	dislikedBy: User[];

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", default: null })
	solvedBy: User;

	@Prop({
		default: [],
		type: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", unique: true },
		],
	})
	tags: Tag[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
