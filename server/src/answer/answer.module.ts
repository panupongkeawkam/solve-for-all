import { Module, forwardRef } from "@nestjs/common";
import { AnswerController } from "./answer.controller";
import { AnswerService } from "./answer.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "./schema/answer.schema";
import { FileModule } from "../file/file.module";
import { UserModule } from "../user/user.module";
import { QuestionModule } from "../question/question.module";

@Module({
	imports: [
		forwardRef(() => FileModule),
		MongooseModule.forFeature([
			{
				name: Answer.name,
				schema: AnswerSchema,
			},
		]),
		forwardRef(() => UserModule),
		forwardRef(() => QuestionModule),
	],
	controllers: [AnswerController],
	providers: [AnswerService],
	exports: [AnswerService],
})
export class AnswerModule {}
