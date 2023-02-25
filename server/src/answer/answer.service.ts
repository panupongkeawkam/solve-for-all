import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Answer } from "./schema/answer.schema";

@Injectable()
export class AnswerService {
	constructor(
		@InjectModel(Answer.name)
		private readonly questionModel: Model<Answer | null>,
	) {}
}
