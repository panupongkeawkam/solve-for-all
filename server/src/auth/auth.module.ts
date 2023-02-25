import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
	imports: [UserModule, PassportModule, JwtModule],
})
export class AuthModule {}
