import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
	providers: [AuthService, LocalStrategy, JwtService],
	controllers: [AuthController],
	imports: [UserModule, PassportModule, JwtModule],
})
export class AuthModule {}
