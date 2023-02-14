import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userService.getUser(username);
		if (!user)
			throw new UnauthorizedException("Your credentials is incorrect");
		const isPasswordValid = await bcrypt.compare(password, user.password);
		console.log(isPasswordValid);

		if (!isPasswordValid)
			throw new UnauthorizedException("Your credentials is incorrect");

		if (user && isPasswordValid) {
			return {
				username: user.username,
				email: user.email,
				name: user.name,
				image: user.image,
				tags: user.tags,
				birthDate: user.birthDate,
				biology: user.biology,
				_id: user._id,
			};
		}
		return null;
	}
}
