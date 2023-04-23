import { attachCookie } from "./utils/cookie.util";
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
import { ChangePasswordDto, CreateUserDto, EditUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { checkPermission } from "../utils/permission.utils";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";
import { TagService } from "src/tag/tag.service";

@Controller("users")
export class UserController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
		private fileService: FileService,
		private tagService: TagService,
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
		res.status(HttpStatus.OK).json({ user });
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
		checkPermission(req.user?._id, req.params?.id);
		const params = {
			buffer: file.buffer,
			fileName: file.originalname,
		};
		try {
			const oldUser = await this.userService.findUserByUserId(
				req.params.id,
			);
			const tags = JSON.parse(req.body?.tags);
			checkPermission(req.user?._id, req.params.id);
			const uploadedFile = await this.fileService.fileUpload(params);
			const query = { ...info, image: uploadedFile?.path, tags };
			const user = await this.userService.editUserByUserId(
				query,
				req.params.id,
			);

			const oldTagsString = oldUser.tags.map((tag) => tag.toString());
			const newTagsString = user.tags.map((tag) => tag.toString());

			const oldTagsSet = new Set(oldTagsString);
			const newTagsSet = new Set(newTagsString);

			const newTags = newTagsString.filter((tag) => {
				return !oldTagsSet.has(tag);
			});

			const removedTags = oldTagsString.filter((tag) => {
				return !newTagsSet.has(tag);
			});

			if (newTags.length > 0) {
				this.tagService.addQuestionOrUserIdToTag(
					newTags,
					req.params?.id,
					"user",
				);
			}
			if (removedTags.length > 0) {
				this.tagService.pullUserIdFromTag(removedTags, req.params?.id);
			}

			res.status(HttpStatus.OK).json({ user });
		} catch (err) {
			console.log(err);
			throw new BadRequestException("something went wrong");
		}
	}

	// 	old User {
	//   _id: new ObjectId("6444fb343ca4dde95cf324b3"),
	//   username: 'ironman2',
	//   email: 'pithawat555@gmail.com',
	//   name: 'pithawatza',
	//   image: 'https://solve-for-all-bucket.s3.amazonaws.com/9f1026e3-fdcc-484d-b76b-ac117aba5961-javascript_code.jpeg',
	//   tags: [ new ObjectId("6444f761fc5bd43a7dcb0034") ],
	//   birthday: 1998-02-10T17:00:00.000Z,
	//   bio: 'my name is world',
	//   reputation: 0,
	//   answered: 0,
	//   solved: 0,
	//   __v: 0
	// }
	// new User {
	//   _id: new ObjectId("6444fb343ca4dde95cf324b3"),
	//   username: 'ironman2',
	//   email: 'pithawat555@gmail.com',
	//   name: 'pithawatza',
	//   image: 'https://solve-for-all-bucket.s3.amazonaws.com/3a5759bd-73c4-44e2-87de-b6325a5aaa20-javascript_code.jpeg',
	//   tags: [
	//     new ObjectId("6444f761fc5bd43a7dcb0034"),
	//     new ObjectId("6444f761fc5bd43a7dcb0034")
	//   ],
	//   birthday: 1998-02-10T17:00:00.000Z,
	//   bio: 'my name is world',
	//   reputation: 0,
	//   answered: 0,
	//   solved: 0,
	//   __v: 0
	// }
	// new Tag [ '6444f761fc5bd43a7dcb0034', '6444f761fc5bd43a7dcb0034' ]

	// update user password
	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Put(":id/password")
	async updatePassword(
		@Body() changePasswordDto: ChangePasswordDto,
		@Req() req: any,
		@Res() res: Response,
	) {
		checkPermission(req.user?._id, req.params?.id);
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(
			changePasswordDto?.password,
			salt,
		);
		try {
			const status = await this.userService.changeUserPassword(
				hashedPassword,
				req.params?.id,
			);
			res.status(HttpStatus.OK).json({
				status,
			});
		} catch (err) {
			console.log(err);
			throw new BadRequestException("something went wrong");
		}
	}

	// use to test authentication
	@UseGuards(JwtAuthGuard)
	@Get("test")
	async testCookie(@Res() res: Response) {
		res.status(HttpStatus.OK).send("You're in");
	}

	@Get("test/no-auth")
	async testRoute(@Res() res: Response) {
		return res.status(HttpStatus.OK).send("Hello there.");
	}
}
