import { PreviewAnswerDto } from "../dto/previewAnswer.dto";

export function previewAnswerFormat(user: any, answer: any): PreviewAnswerDto {
	return {
		_id: answer?._id,
		answeredIn: answer?.answeredIn,
		body: answer?.body,
		likedBy: answer?.likedBy,
		dislikedBy: answer?.dislikedBy,
		rating: answer?.rating,
		isSolved: answer?.isSolved,
		createdAt: answer?.createdAt,
		replies: answer?.replies,
		answeredBy: {
			_id: user?._id,
			name: user?.name,
			username: user?.username,
			image: user?.image,
		},
	};
}
