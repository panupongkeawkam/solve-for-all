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
import { CreateUserDto } from "./Dto/createUser.dto";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";

@Controller("users")
export class UserController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
	) {}

	@Get()
	async findPeople(@Res() res: Response) {
		const users = await this.userService.findAllUsername();
		res.status(HttpStatus.OK).send("HELLO");
	}

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
		res.status(HttpStatus.CREATED).json({ user, token });
	}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	async loginUser(@Req() req: Request, @Res() res: Response) {
		const token = await this.authService.tokenGenerate(req.user);
		res.status(HttpStatus.OK).json({
			user: req.user,
			token,
		});
	}

	@Get("protected")
	getUser(@Res() res: Response) {
		res.status(HttpStatus.OK).json({
			msg: "Hi",
		});
	}
}
