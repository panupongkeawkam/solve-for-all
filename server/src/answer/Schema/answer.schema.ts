import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AnswerDocument = HydratedDocument<Answer | null>;

@Schema({ timestamps: true, collection: "Answer" })
export class Answer {
	@Prop({ default: "" })
	answeredBy: string;

	@Prop({ default: "" })
	answeredIn: string;

	@Prop({ default: "" })
	title: string;

	@Prop({ default: "" })
	description: string;

	@Prop({ default: []})
	body: string[];

    @Prop({ default: [] })
	likedBy: string[];

    @Prop({ default: [] })
	dislikedBy: string[];

	@Prop({ default: 0 })
	rating: Number;
    
    @Prop({ default: [] })
	replies: string[];

    @Prop({ default: false })
	isSolve: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
