import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "src/user/schema/user.schema";
import { Answer } from "../../answer/schema/answer.schema";

export type ReplyDocument = HydratedDocument<Reply | null>;

@Schema({ timestamps: true, collection: "Reply" })
export class Reply {
	@Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
	repliedBy: User;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "Answer",
	})
	repliedIn: Answer;

	@Prop({ required: true })
	message: string;

    
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
