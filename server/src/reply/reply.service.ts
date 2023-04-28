import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reply } from "./schema/reply.schema";
import { Model } from "mongoose";
import { CreateReplyDto } from "./dto/createReply.dto";

@Injectable()
export class ReplyService {
	constructor(
		@InjectModel(Reply.name) private replyModel: Model<Reply | null>,
	) {}

	async createReply(query: CreateReplyDto): Promise<Reply | null> {
		try {
			return this.replyModel.create(query);
		} catch (err) {
			throw new InternalServerErrorException("Something went wrong.");
		}
	}

	async findManyReplies(query: string[]): Promise<Reply[] | null> {
		return await this.replyModel.find({
			_id: query,
		});
	}
}
