import { Module } from "@nestjs/common";
import { AnswerController } from "./answer.controller";
import { AnswerService } from "./answer.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "./schema/answer.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Answer.name,
				schema: AnswerSchema,
			},
		]),
	],
	controllers: [AnswerController],
	providers: [AnswerService],
	exports: [AnswerService],
})
export class AnswerModule {}
