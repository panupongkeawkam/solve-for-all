import { Module, forwardRef } from "@nestjs/common";
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
		forwardRef(() => UserModule),
		MongooseModule.forFeature([
			{
				name: Question.name,
				schema: QuestionSchema,
			},
		]),
		forwardRef(() => TagModule),
		forwardRef(() => FileModule),
	],
	exports: [QuestionService],
})
export class QuestionModule {}
