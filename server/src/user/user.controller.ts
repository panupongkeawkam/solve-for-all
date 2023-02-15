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

@Controller("users")
export class UserController {
	constructor(private userService: UserService) {}

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
		res.status(HttpStatus.CREATED).json(user);
	}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	loginUser(@Req() req: Request, @Res() res: Response) {
		console.log(req);
		res.status(HttpStatus.OK).json({
			User: req.user,
		});
	}

	@Get("protected")
	getUser(@Res() res: Response) {
		res.status(HttpStatus.OK).json({
			msg: "Hi",
		});
	}
}
