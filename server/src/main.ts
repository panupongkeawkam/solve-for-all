import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { config } from "aws-sdk";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: process.env.ACCESS_ALLOW_ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	});

	app.use(cookieParser());

	// aws credential for S3 bucket
	config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
		region: process.env.AWS_REGION,
	});

	const PORT = process.env.PORT || 2000;
	await app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}
bootstrap();
