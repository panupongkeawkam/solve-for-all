import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "../../user/schema/user.schema";
import { Answer } from "../../answer/schema/answer.schema";

export type ReplyDocument = mongoose.HydratedDocument<Reply | null>;

@Schema({ timestamps: true, collection: "Reply", selectPopulatedPaths: true })
export class Reply {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	repliedBy: User;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: "Answer",
	})
	repliedIn: Answer;

	@Prop({ required: true })
	message: string;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
