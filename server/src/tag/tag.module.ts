import { Module, forwardRef } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tag, TagSchema } from "./schema/tag.schema";
import { TagService } from "./tag.service";
import { QuestionModule } from "../question/question.module";
import { UserModule } from "../user/user.module";

@Module({
	controllers: [TagController],
	imports: [
		MongooseModule.forFeature([
			{
				name: Tag.name,
				schema: TagSchema,
			},
		]),
		forwardRef(() => QuestionModule),
		forwardRef(() => UserModule),
	],
	providers: [TagService],
	exports: [TagService],
})
export class TagModule {}
