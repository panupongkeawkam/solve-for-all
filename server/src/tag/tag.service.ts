import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tag } from "./schema/tag.schema";
import { Model } from "mongoose";
import { CreateTagInterface } from "./interfaces/create.interface";

@Injectable()
export class TagService {
	constructor(@InjectModel(Tag.name) private tagModel: Model<Tag | null>) {}

	async createNewTags(models: CreateTagInterface): Promise<any> {
		const createdTag = await this.tagModel.insertMany(models);
		return createdTag.map(({ _id, name }) => ({ _id, name }));
	}

	async addQuestionOrUserIdToTag(
		tagsId: string[],
		targetId: string,
		from: string,
	): Promise<void> {
		const pushKey = from === "question" ? "questions" : "interestedBy";
		try {
			tagsId.forEach(async (tagId) => {
				await this.tagModel.findOneAndUpdate(
					{ _id: tagId },
					{
						$push: {
							[pushKey]: targetId,
						},
					},
				);
			});
		} catch (err) {
			throw new BadRequestException("Some tag ID doesn't exists");
		}
	}

	async getAllTags(): Promise<Tag[] | null> {
		const tags = await this.tagModel.find({}).select({
			_id: 1,
			name: 1,
		});
		return tags;
	}

	async findManyTags(query: string[]): Promise<Tag[] | null> {
		const tags = await this.tagModel
			.find({
				_id: query,
			})
			.select({
				_id: 1,
				name: 1,
			});
		return tags;
	}
}
