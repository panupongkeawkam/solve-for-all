import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Payload } from "./interfaces/payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwtGuard") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractJwt,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_KEY,
		});
	}

	async validate(payload: Payload): Promise<Payload | null> {
		return {
			_id: payload._id,
			username: payload.username,
		};
	}

	static extractJwt(req: Request): string | null {
		if (req.cookies && "accessToken" in req.cookies) {
			return req.cookies?.accessToken;
		}
		return null;
	}
}
