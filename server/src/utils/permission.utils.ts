import { UnauthorizedException } from "@nestjs/common";

// for extends the user role
export function checkPermission(source: string, req: string) {
	if (source === req) return;
	throw new UnauthorizedException("Unauthorized");
}
