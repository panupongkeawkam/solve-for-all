import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { Question } from "../../question/schema/question.schema";
import { User } from "src/user/schema/user.schema";

export type TagDocument = HydratedDocument<Tag | null>;

@Schema({ timestamps: true, collection: "Tag" })
export class Tag {
	@Prop({ required: true })
	name: string;

	@Prop({
		default: [],
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
	})
	questions: Question[];

	@Prop({
		default: [],
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	})
	interestedBy: User[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
