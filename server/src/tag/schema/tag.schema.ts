import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Question } from "../../question/schema/question.schema";
import { User } from "src/user/schema/user.schema";

export type TagDocument = mongoose.HydratedDocument<Tag | null>;

@Schema({ timestamps: true, collection: "Tag", selectPopulatedPaths: true })
export class Tag {
	@Prop({ required: true, unique: true })
	name: string;

	@Prop({
		default: [],
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Question",
				unique: true,
			},
		],
	})
	questions: Question[];

	@Prop({
		default: [],
		type: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
		],
	})
	interestedBy: User[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
