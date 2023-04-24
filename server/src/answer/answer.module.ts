import { Module } from "@nestjs/common";
import { AnswerController } from "./answer.controller";
import { AnswerService } from "./answer.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "./schema/answer.schema";
import { FileModule } from "src/file/file.module";
import { UserModule } from "src/user/user.module";
import { QuestionModule } from "src/question/question.module";

@Module({
	imports: [
		FileModule,
		MongooseModule.forFeature([
			{
				name: Answer.name,
				schema: AnswerSchema,
			},
		]),
		UserModule,
		QuestionModule
	],
	controllers: [AnswerController],
	providers: [AnswerService],
	exports: [AnswerService],
})
export class AnswerModule {}
