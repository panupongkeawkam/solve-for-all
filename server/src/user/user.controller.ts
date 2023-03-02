import { attachCookie, destroyCookie } from "./utils/attachCookie.util";
import {
	Post,
	Get,
	Req,
	Res,
	UsePipes,
	HttpStatus,
	Body,
	ValidationPipe,
	UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Controller } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("users")
export class UserController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
	) {}

	// logout function use CreateUserDto for form validation
	@UsePipes(ValidationPipe)
	@Post("signup")
	async createUser(@Body() body: CreateUserDto, @Res() res: Response) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body.password, salt);
		const user = await this.userService.createUser({
			...body,
			password: hashedPassword,
		});
		const token = await this.authService.tokenGenerate(user);
		attachCookie(res, token);
		res.status(HttpStatus.CREATED).json({ user });
	}

	// login function use LoginDto for credentials validation
	// use LocalAuthGuard for verification
	@UsePipes(ValidationPipe)
	@UseGuards(LocalAuthGuard)
	@Post("login")
	async loginUser(
		@Body() body: LoginDto,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const token = await this.authService.tokenGenerate(req.user);
		attachCookie(res, token);
		res.status(HttpStatus.OK).json({
			user: req.user,
		});
	}

	// use JwtAuthGuard for identification
	@UseGuards(JwtAuthGuard)
	@Post("logout")
	async logout(@Req() req: Request, @Res() res: Response) {
		destroyCookie(res);
		res.status(HttpStatus.OK).send("logout successfully");
	}

	// use to test authentication
	@UseGuards(JwtAuthGuard)
	@Get()
	async testCookie(@Res() res: Response) {
		res.status(HttpStatus.OK).send("You're in");
	}
}
