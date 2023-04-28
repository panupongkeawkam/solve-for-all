import { Module, forwardRef } from "@nestjs/common";
import { ReplyController } from "./reply.controller";
import { ReplyService } from "./reply.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Reply, ReplySchema } from "./schema/reply.schema";
import { AnswerModule } from "../answer/answer.module";
import { QuestionModule } from "../question/question.module";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Reply.name,
				schema: ReplySchema,
			},
		]),
		forwardRef(() => AnswerModule),
		forwardRef(() => QuestionModule),
	],
	controllers: [ReplyController],
	providers: [ReplyService],
	exports: [ReplyService],
})
export class ReplyModule {}
