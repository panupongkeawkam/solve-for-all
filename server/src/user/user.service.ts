import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto, EditUserDto } from "./dto/user.dto";
import { UserDetail } from "./interfaces/user.interface";
import { ReputationQueryDto } from "src/dto/reputationQuery.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User | null>,
	) {}

	// receive POST method
	async createUser(query: CreateUserDto): Promise<UserDetail | null> {
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

	async findUserByUserId(query: string): Promise<User | null> {
		const user = await this.userModel.findById(query).select({
			password: 0,
			createdAt: 0,
			updatedAt: 0,
		});
		if (user) {
			return user;
		}
		return null;
	}

	async findUserByUserIdLess(query: string): Promise<User | null> {
		const user = await this.userModel.findOne({ _id: query }).select({
			name: 1,
			username: 1,
			image: 1,
		});
		return user;
	}

	// username name id
	async findSuggestUsers(): Promise<User[] | null> {
		const users = await this.userModel
			.find()
			.select({
				username: 1,
				_id: 1,
				name: 1,
				image: 1,
			})
			.limit(10)
			.sort({
				reputation: 1,
			});
		return users;
	}

	// update user information
	async editUserByUserId(
		query: EditUserDto,
		_id: string,
	): Promise<User | null> {
		const user = await this.userModel
			.findByIdAndUpdate(
				{ _id },
				{
					email: query?.email,
					name: query?.name,
					imagePath: query?.imagePath,
					birthday: query?.birthday,
					tags: query?.tags || [],
					bio: query?.bio,
				},
				{ new: true },
			)
			.select({
				updatedAt: 0,
				createdAt: 0,
				password: 0,
			});
		if (user) {
			return user;
		}
		return null;
	}

	async changeUserPassword(
		hashedPassword: string,
		_id: string,
	): Promise<boolean | null> {
		const user = await this.userModel.findByIdAndUpdate(
			{ _id },
			{
				password: hashedPassword,
			},
			{
				new: true,
			},
		);
		if (user) {
			return true;
		}
		return false;
	}

	async reputationCompute(query: ReputationQueryDto): Promise<void> {
		const reputation = query.isLike ? 1 : -1;
		await this.userModel.findOneAndUpdate(
			{
				_id: query._id,
			},
			{
				$inc: {
					reputation: reputation,
				},
			},
		);
	}

	async answeredCompute(query: string): Promise<void> {
		await this.userModel.findOneAndUpdate(
			{
				_id: query,
			},
			{
				$inc: {
					answered: 1,
				},
			},
			{
				new: true,
			},
		);
	}

	async increaseSolved(query: string): Promise<void> {
		await this.userModel.findOneAndUpdate(
			{
				_id: query,
			},
			{
				$inc: {
					solved: 1,
				},
			},
			{
				new: true,
			},
		);
	}
}
