import { Response } from "express";

export function attachCookie(res: Response, token: string) {
	const oneDay = 1000 * 60 * 60 * 24; // millisecond
	res.cookie("accessToken", token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
	});
}

export function destroyCookie(res: Response) {
	res.cookie("accessToken", "", {
		httpOnly: true,
		expires: new Date(),
	});
}
