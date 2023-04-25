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
import { QuestionService } from "src/question/question.service";
import { PreviewQuestionDto } from "src/question/dto/previewQuestion.dto";
import {
	previewQuestionFormat,
	previewUserFormat,
} from "src/utils/formatter.utils";

@Controller("users")
export class UserController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
		private fileService: FileService,
		private tagService: TagService,
		private questionService: QuestionService,
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
		const user = await this.userService.findUserByUserId(req.params?.id);
		const questions = await this.questionService.findQuestionsByUserId(
			req.params?.id,
		);

		const questionResponses: PreviewQuestionDto[] = await Promise.all(
			questions.map(async (question) => {
				const tagQuery = question.tags.map((tag) => tag.toString());
				const tags = await this.tagService.findManyTags(tagQuery);
				return previewQuestionFormat(question, user, tags);
			}),
		);

		const tagQuery = user.tags.map((tag) => tag.toString());
		const tags = await this.tagService.findManyTags(tagQuery);
		const response = previewUserFormat(tags, user, questionResponses);
		res.status(HttpStatus.OK).json({
			user: response,
		});
	}

	// edit user information function
	@UseGuards(JwtAuthGuard)
	@Put(":id")
	@UseInterceptors(
		FileInterceptor("imageFile", {
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
	) {
		checkPermission(req.user?._id, req.params?.id);
		const name = JSON.parse(req.body.name);
		const email = JSON.parse(req.body.email);
		const bio = JSON.parse(req.body.bio);
		const birthday = JSON.parse(req.body.birthday);
		const image = JSON.parse(req.body.image);

		try {
			let uploadedFile = file ? "" : image;
			const oldUser = await this.userService.findUserByUserId(
				req.params.id,
			);
			const tags = JSON.parse(req.body?.tags);
			checkPermission(req.user?._id, req.params.id);
			if (file) {
				const params = {
					buffer: file.buffer,
					fileName: file.originalname,
				};
				uploadedFile = (await this.fileService.fileUpload(params)).path;
			}
			const query = {
				name,
				email,
				bio,
				birthday,
				image: uploadedFile,
				tags,
			};
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
