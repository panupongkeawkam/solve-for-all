import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		UserModule,
		AuthModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URI),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
