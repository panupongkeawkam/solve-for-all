import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
			console.log(
				"error from tag service add question or user id to tag function",
			);
			console.log(err);
			throw new InternalServerErrorException("Something went wrong.");
		}
	}

	async pullUserIdFromTag(tagsId: string[], targetId: string): Promise<void> {
		try {
			tagsId.forEach(async (tagId) => {
				await this.tagModel.findOneAndUpdate(
					{
						_id: tagId,
					},
					{
						$pull: {
							interestedBy: targetId,
						},
					},
				);
			});
		} catch (err) {
			console.log(
				"error from tag service pull user id from tag function",
			);
			console.log(err);
			throw new InternalServerErrorException("Something went wrong.");
		}
	}

	async pullQuestionIdFromTag(
		tagsId: string[],
		targetId: string,
	): Promise<void> {
		try {
			tagsId.forEach(async (tagId) => {
				await this.tagModel.findOneAndUpdate(
					{
						_id: tagId,
					},
					{
						$pull: {
							questions: targetId,
						},
					},
				);
			});
		} catch (err) {
			console.log("error from tag service pull user id from tag");
			console.log(err);
			throw new InternalServerErrorException("Something went wrong.");
		}
	}

	async getAllTags(): Promise<Tag[] | null> {
		const tags = await this.tagModel.find({}).select({
			_id: 1,
			name: 1,
			questions: 1,
			interestedBy: 1,
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

	async findTagByTagId(query: string): Promise<Tag | null> {
		const tag = await this.tagModel.findById(query).select({
			_id: 1,
			questions: 1,
			name: 1,
		});
		return tag;
	}

	async findManyTagsWithQuestions(query: string[]): Promise<Tag[] | null> {
		const tags = await this.tagModel
			.find({
				_id: query,
			})
			.select({
				_id: 1,
				questions: 1,
				name: 1,
			});
		return tags;
	}
}
