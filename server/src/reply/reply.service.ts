import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reply } from "./schema/reply.schema";
import { Model } from "mongoose";

@Injectable()
export class ReplyService {
	constructor(
		@InjectModel(Reply.name) private replyModel: Model<Reply | null>,
	) {}
}
