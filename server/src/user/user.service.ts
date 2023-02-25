import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User | null>,
	) {}

	// receive POST method
	async createUser(createUserDto: CreateUserDto): Promise<any> {
		try {
			const user: any = await this.userModel.create(createUserDto);
			const { password, createdAt, updatedAt, ...rest } = user?._doc;
			return rest;
		} catch (error) {
			const { username } = error.keyValue;
			if (error.code === 11000 && username)
				throw new BadRequestException("Username is used");
			else if (error.code === 11000)
				throw new BadRequestException("Email is used");
		}
	}

	// receive GET method
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

	async findAllUsername(): Promise<any> {
		const users = await this.userModel
			.find()
			.select({
				username: 1,
				_id: 1,
			})
			.limit(10);
		return users;
	}
}
