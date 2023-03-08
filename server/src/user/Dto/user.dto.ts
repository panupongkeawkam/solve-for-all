import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { TagInterface } from "../../tag/interfaces/tag.interface";

export class CreateUserDto {
	@IsNotEmpty({ message: "Please provide your name" })
	name: string;

	@IsNotEmpty({ message: "Please provide your username" })
	@MinLength(6)
	username: string;

	@IsNotEmpty({ message: "Please provide your password" })
	@MinLength(6)
	password: string;

	@IsNotEmpty({ message: "Please provide your email" })
	@IsEmail()
	email: string;

	tags: TagInterface[];

	birthday: Date;

	bio: string;
}

export class EditUserDto {
	@IsNotEmpty({ message: "Please provide your name" })
	name: string;

	@IsNotEmpty({ message: "Please provide your email" })
	@IsEmail()
	email: string;

	bio: string;

	birthday: Date;

	tags: string[];

	image: string;
}
