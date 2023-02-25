import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

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

	async tokenGenerate(user: any) {
		const payload = { username: user?.username, _id: user?._id };

		return this.jwtService.sign(payload, {
			expiresIn: process.env.JWT_LIFETIME,
			secret: process.env.JWT_SECRET_KEY,
		});
	}
}
