import { PreviewReplyDto } from "../dto/previewReply.dto";

export function previewReplyFormat(user: any, reply: any): PreviewReplyDto {
	return {
		_id: reply?._id,
		repliedIn: reply?.repliedIn,
		message: reply?.message,
		createdAt: reply?.createdAt,
		updatedAt: reply?.createdAt,
		repliedBy: {
			_id: user?._id,
			name: user?.name,
			username: user?.username,
			image: user?.image,
		},
	};
}
