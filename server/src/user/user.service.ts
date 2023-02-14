import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./Schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./Dto/createUser.dto";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	// receive POST method
	async createUser(createUserDto: CreateUserDto): Promise<any> {
		try {
			const user = await this.userModel.create(createUserDto);
			return {
				username: user.username,
				email: user.email,
				name: user.name,
				image: user.image,
				tags: user.tags,
				birthDate: user.birthDate,
				biology: user.biology,
				_id: user._id,
			};
		} catch (error) {
			const { username } = error.keyValue;
			console.log(error);
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
			console.log(error);
			throw new UnauthorizedException("Your username is incorrect");
		}
	}
}
