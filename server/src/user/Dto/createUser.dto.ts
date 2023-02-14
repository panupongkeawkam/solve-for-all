import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

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

	tags: string[];

	birth_date: Date;

	biology: string;
}
