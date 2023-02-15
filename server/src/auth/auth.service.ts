import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user: any = await this.userService.getUser(username);
		if (!user)
			throw new UnauthorizedException("Your credentials is incorrect");
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid)
			throw new UnauthorizedException("Your credentials is incorrect");

		if (user && isPasswordValid) {
			const { password, createdAt, updatedAt, ...rest } = user?._doc;
			return rest;
		}
		return null;
	}
}
