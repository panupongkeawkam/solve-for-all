import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User | null>;

@Schema({ timestamps: true, collection: "User" })
export class User {
	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	name: string;

	@Prop({ default: "" })
	image: string;

	@Prop({ default: [] })
	tags: string[];

	@Prop({ default: null })
	birthDate: Date;

	@Prop({ default: "" })
	biology: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
