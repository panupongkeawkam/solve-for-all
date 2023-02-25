import { Controller } from "@nestjs/common";
import { ReplyService } from "./reply.service";

@Controller("replies")
export class ReplyController {
	constructor(private replyService: ReplyService) {}
}
