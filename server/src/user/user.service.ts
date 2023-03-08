import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto, EditUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User | null>,
	) {}

	// receive POST method
	async createUser(query: CreateUserDto): Promise<any> {
		try {
			const user: any = await this.userModel.create(query);
			const { password, createdAt, updatedAt, ...rest } = user?._doc;
			return rest;
		} catch (error) {
			console.log(error);
			const { username } = error.keyValue;
			if (error.code === 11000 && username)
				throw new BadRequestException("Username is used");
			else if (error.code === 11000)
				throw new BadRequestException("Email is used");
		}
	}

	// receive GET method for validation
	async getUser(username: string): Promise<any> {
		try {
			const findUser = await this.userModel.findOne({
				username: username,
			});
			return findUser;
		} catch (error) {
			throw new UnauthorizedException("Your username is incorrect");
		}
	}

	async findUserByUserId(_id: string): Promise<User | null> {
		const user = await this.userModel
			.findOne({
				_id,
			})
			.select({
				password: 0,
				createdAt: 0,
				updatedAt: 0,
			});
		if (user) {
			return user;
		}
		return null;
	}

	// username name id
	async findSuggestUsers(): Promise<any> {
		const users = await this.userModel
			.find()
			.select({
				username: 1,
				_id: 1,
				name: 1,
			})
			.limit(10)
			.sort({
				reputation: 1,
			});
		return users;
	}

	async editUserByUserId(
		query: EditUserDto,
		_id: string,
	): Promise<any | null> {
		console.log(query);
		const user = await this.userModel.findByIdAndUpdate(
			{ _id },
			{
				email: query?.email,
				name: query?.name,
				image: query?.image,
				birthday: query?.birthday,
				tags: query?.tags || [],
				bio: query?.bio,
			},
			{ new: true },
		).select({
			updatedAt: 0,
			createdAt: 0,
			password: 0,
		});
		if (user) {
			return user;
		}
		return null;
	}
}
