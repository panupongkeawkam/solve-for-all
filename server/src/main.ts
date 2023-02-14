import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: process.env.ACCESS_ALLOW_ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	});

	const PORT = process.env.PORT || 2000;
	await app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}
bootstrap();
