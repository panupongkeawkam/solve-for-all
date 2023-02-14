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

// export const UserSchema = new mongoose.Schema(
// 	{
// 		username: {
// 			type: String,
// 			unique: true,
// 			required: true,
// 		},
// 		name: {
// 			type: String,
// 			required: true,
// 		},
// 		password: {
// 			type: String,
// 			required: true,
// 		},
// 		email: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// 		image: {
// 			type: String,
// 			default: "",
// 		},
// 		tags: [
// 			{
// 				type: String,
// 				default: [],
// 			},
// 		],
// 		rating: {
// 			type: Number,
// 			default: 0,
// 		},
// 		birthDay: {
// 			type: Date,
// 			default: null,
// 		},
// 		biology: {
// 			type: String,
// 			default: "",
// 		},
// 	},
// 	{
// 		timestamps: true,
// 		collection: "User",
// 	},
// );

// export interface User extends mongoose.Document {

// }

export const UserSchema = SchemaFactory.createForClass(User);
