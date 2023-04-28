import { PreviewUserDto } from "../dto/previewUser.dto";

export function previewUserFormat(
	tags: any,
	user: any,
	questions: any,
): PreviewUserDto | null {
	return {
		_id: user?._id,
		username: user?.username,
		email: user?.email,
		name: user?.name,
		image: user?.image,
		tags,
		birthday: user?.birthday,
		bio: user?.bio,
		reputation: user?.reputation,
		answered: user?.answered,
		solved: user?.solved,
		questions: questions,
	};
}
