import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { Question } from "../../question/schema/question.schema";
import { User } from "../../user/Schema/user.schema";

export type NotificationDocument = HydratedDocument<Notification | null>;

@Schema({ timestamps: true, collection: "Notification" })
export class Notification {
	@Prop({ default: false })
	isRead: boolean;

	// answer title or answer description
	@Prop({ required: true })
	message: string;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "Question",
	})
	question: Question;

	@Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
	to: User;

	@Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
	fromUserId: User;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
