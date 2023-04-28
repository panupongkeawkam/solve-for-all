import { IsNotEmpty } from "class-validator";

export class LoginDto {
	@IsNotEmpty({ message: "Please provide all values" })
	username: string;

	@IsNotEmpty({ message: "Please provide all values" })
	password: string;
}
