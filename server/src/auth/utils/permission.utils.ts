import { UnauthorizedException } from "@nestjs/common";

export function checkPermission(source: string, req: string) {
	if (source === req) return;
	throw new UnauthorizedException("Unauthorized");
}
