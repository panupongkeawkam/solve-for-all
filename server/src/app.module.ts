import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { QuestionModule } from "./question/question.module";
import { AnswerModule } from "./answer/answer.module";
import { ReplyModule } from "./reply/reply.module";
import { TagModule } from "./tag/tag.module";
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URI),
		QuestionModule,
		AnswerModule,
		ReplyModule,
		TagModule,
		NotificationModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
