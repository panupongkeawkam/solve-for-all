import { Response } from "express";

export function attachCookie(res: Response, token: string) {
	const oneDay = 1000 * 60 * 60 * 24; // millisecond
	res.cookie("accessToken", token, {
		expires: new Date(Date.now() + oneDay),
	});
}
