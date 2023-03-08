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
	BadRequestException,
	Put,
	UseInterceptors,
	UploadedFile,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Controller } from "@nestjs/common";
import { CreateUserDto, EditUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { checkPermission } from "../utils/permission.utils";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";

@Controller("users")
export class UserController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
		private fileService: FileService,
	) {}

	// sign-up function
	@UsePipes(ValidationPipe)
	@Post("signup")
	async createUser(@Body() body: CreateUserDto, @Res() res: Response) {
		const setOfTags = new Set(body.tags.map(({ _id }) => _id));
		const isSameTag = body.tags.length > setOfTags.size;

		if (isSameTag) throw new BadRequestException("Tag should be unique");

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

	// login function
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

	// logout function
	@UseGuards(JwtAuthGuard)
	@Post("logout")
	async logout(@Req() req: Request, @Res() res: Response) {
		destroyCookie(res);
		res.status(HttpStatus.OK).send("logout successfully");
	}

	// suggest user function
	@Get("suggest")
	async suggestUser(@Req() req: Request, @Res() res: Response) {
		const suggestedUsers = await this.userService.findSuggestUsers();
		res.status(HttpStatus.OK).json({
			users: suggestedUsers,
		});
	}

	// find one user by user ID
	@Get(":id")
	async findUserById(@Req() req: Request, @Res() res: Response) {
		const user = await this.userService.findUserByUserId(req.params.id);
		res.status(HttpStatus.OK).json(user);
	}

	// edit user information function
	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Put(":id")
	@UseInterceptors(
		FileInterceptor("image", {
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
					return cb(null, false);
				}
				cb(null, true);
			},
		}),
	)
	async updateUserById(
		@Req() req: any,
		@Res() res: Response,
		@UploadedFile() file: Express.Multer.File,
		@Body() info: EditUserDto,
	) {
		// check user permission
		checkPermission(req.user?._id, req.params?.id);
		const params = {
			buffer: file.buffer,
			fileName: file.originalname,
		};
		try {
			const uploadedFile = await this.fileService.fileUpload(params);
			const query = { ...info, image: uploadedFile?.path };
			const user = await this.userService.editUserByUserId(
				query,
				req.params.id,
			);
			res.status(HttpStatus.OK).json(user);
		} catch (err) {
			console.log(err);
			throw new BadRequestException("something went wrong");
		}
	}

	@UseGuards(JwtAuthGuard)
	@Put(":id/password")
	async updatePassword(@Req() req: Request, @Res() res: Response) {}

	// use to test authentication
	@UseGuards(JwtAuthGuard)
	@Get("test")
	async testCookie(@Res() res: Response) {
		res.status(HttpStatus.OK).send("You're in");
	}
}
