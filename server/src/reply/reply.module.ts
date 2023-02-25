import { Module } from "@nestjs/common";
import { ReplyController } from "./reply.controller";
import { ReplyService } from "./reply.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Reply, ReplySchema } from "./schema/reply.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Reply.name,
				schema: ReplySchema,
			},
		]),
	],
	controllers: [ReplyController],
	providers: [ReplyService],
	exports: [ReplyService],
})
export class ReplyModule {}
