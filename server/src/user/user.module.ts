import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { AuthService } from "src/auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { TagModule } from "src/tag/tag.module";
import { FileModule } from '../file/file.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
		JwtModule,
		TagModule,
		FileModule
	],
	providers: [UserService, AuthService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
