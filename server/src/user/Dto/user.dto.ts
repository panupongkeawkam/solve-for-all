import {
	IsEmail,
	IsNotEmpty,
	IsStrongPassword,
	MinLength,
} from "class-validator";
import { TagInterface } from "../../tag/interfaces/tag.interface";

export class CreateUserDto {
	@IsNotEmpty({ message: "Please provide your name" })
	name: string;

	@IsNotEmpty({ message: "Please provide your username" })
	@MinLength(6)
	username: string;

	@IsNotEmpty({ message: "Please provide your password" })
	// @IsStrongPassword()
	@MinLength(6)
	password: string;

	@IsEmail()
	email: string;

	tags: TagInterface[];

	birthday: Date;

	bio: string;
}

export class EditUserDto {
	@IsNotEmpty({ message: "Please provide your name" })
	name: string;

	@IsEmail()
	email: string;

	bio: string;

	birthday: Date;

	tags: string[];

	image: string;
}

export class ChangePasswordDto {
	@IsNotEmpty({ message: "Please provide your password" })
	@IsStrongPassword()
	password: string;
}
