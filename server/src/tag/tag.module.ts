import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tag, TagSchema } from "./schema/tag.schema";
import { TagService } from './tag.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Tag.name,
				schema: TagSchema,
			},
		]),
	],
	controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
