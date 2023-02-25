import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tag } from "./schema/tag.schema";
import { Model } from "mongoose";

@Injectable()
export class TagService {
	constructor(@InjectModel(Tag.name) private tagModel: Model<Tag | null>) {}
}
