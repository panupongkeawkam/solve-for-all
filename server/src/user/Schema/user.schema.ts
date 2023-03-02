import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Tag } from "src/tag/schema/tag.schema";

export type UserDocument = mongoose.HydratedDocument<User | null>;

@Schema({ timestamps: true, collection: "User", selectPopulatedPaths: true })
export class User {
	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ default: "" })
	image: string;

	@Prop({
		type: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", unique: true },
		],
	})
	tags: Tag[];

	@Prop({ default: null })
	birthday: Date;

	@Prop({ default: "" })
	bio: string;

	@Prop({ default: 0 })
	reputation: number;

	@Prop({ default: 0 })
	answered: number;

	@Prop({ default: 0 })
	solved: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
