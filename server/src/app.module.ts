import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { QuestionModule } from "./question/question.module";
import { AnswerModule } from "./answer/answer.module";
import { ReplyModule } from "./reply/reply.module";
import { TagModule } from "./tag/tag.module";
import { NotificationModule } from "./notification/notification.module";
import { FileModule } from "./file/file.module";

@Module({
	imports: [
		UserModule,
		QuestionModule,
		AuthModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URI),
		AnswerModule,
		ReplyModule,
		TagModule,
		NotificationModule,
		FileModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
