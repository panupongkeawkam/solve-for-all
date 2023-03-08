import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionSchema } from "./schema/question.schema";
import { TagModule } from "../tag/tag.module";
import { FileModule } from "../file/file.module";

@Module({
	providers: [QuestionService],
	controllers: [QuestionController],
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{
				name: Question.name,
				schema: QuestionSchema,
			},
		]),
		TagModule,
		FileModule,
	],
	exports: [QuestionService],
})
export class QuestionModule {}
