import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationSchema, Notification } from "./schema/notification.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Notification.name,
				schema: NotificationSchema,
			},
		]),
	],
	controllers: [NotificationController],
	providers: [NotificationService],
	exports: [NotificationService],
})
export class NotificationModule {}
