import { Module } from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { AnswerController } from "./answer.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "./Schema/answer.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Answer.name,
				schema: AnswerSchema,
			},
		]),
	],
	providers: [AnswerService],
	controllers: [AnswerController],
	exports: [AnswerService],
})
export class AnswerModule {}
