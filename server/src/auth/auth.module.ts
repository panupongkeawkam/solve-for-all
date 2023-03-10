import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	providers: [AuthService, LocalStrategy, JwtStrategy],
	imports: [UserModule, PassportModule, JwtModule],
})
export class AuthModule {}
