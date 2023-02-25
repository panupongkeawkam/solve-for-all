import { Controller } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller("notifications")
export class NotificationController {
	constructor(private notificationService: NotificationService) {}
}
