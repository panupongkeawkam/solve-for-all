import {
	Controller,
	Get,
	Req,
	Res,
	BadGatewayException,
	HttpStatus,
} from "@nestjs/common";
import { TagService } from "./tag.service";
import { Response, Request } from "express";

@Controller("tag")
export class TagController {
	constructor(private tagService: TagService) {}

	@Get()
	async getAllTags(@Res() res: Response, @Req() req: Request) {
		try {
			const tags = await this.tagService.getAllTags();
			res.status(HttpStatus.OK).json({
				tags,
			});
		} catch (err) {
			console.log(err);
			throw new BadGatewayException("Something went wrong");
		}
	}
}
