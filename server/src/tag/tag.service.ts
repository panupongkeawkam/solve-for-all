import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tag } from "./schema/tag.schema";
import { Model } from "mongoose";
import { CreateTagInterface } from "./interfaces/createTag.interface";

@Injectable()
export class TagService {
	constructor(@InjectModel(Tag.name) private tagModel: Model<Tag | null>) {}

	async createNewTags(models: CreateTagInterface): Promise<any> {
		const createdTag = await this.tagModel.insertMany(models);
		return createdTag.map(({ _id }) => _id);
	}

	async addQuestionOrUserIdToTag(
		tagsId: string[],
		targetId: string,
		from: string,
	): Promise<any> {
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
			console.log("ADD TAG", err);
			throw new BadRequestException("Some tag ID doesn't exists");
		}
	}
}
