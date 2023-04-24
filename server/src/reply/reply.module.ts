import { Module, forwardRef } from "@nestjs/common";
import { ReplyController } from "./reply.controller";
import { ReplyService } from "./reply.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Reply, ReplySchema } from "./schema/reply.schema";
import { AnswerModule } from "src/answer/answer.module";
import { QuestionModule } from "src/question/question.module";
import { UserModule } from "src/user/user.module";

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
		forwardRef(() => UserModule),
	],
	controllers: [ReplyController],
	providers: [ReplyService],
	exports: [ReplyService],
})
export class ReplyModule {}
