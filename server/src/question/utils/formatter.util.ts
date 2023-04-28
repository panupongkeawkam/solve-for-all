import { PreviewQuestionDto } from "../dto/previewQuestion.dto";

export function previewQuestionFormat(
	question: any,
	user: any,
	tags: any,
): PreviewQuestionDto | null {
	const createdBy = {
		image: user.image,
		name: user.name,
		username: user.username,
		_id: user?._id,
	};
	return {
		_id: question?._id,
		createdBy,
		solvedBy: question.solvedBy || null,
		title: question.title,
		body: question.body,
		viewed: question.viewed,
		rating: question.rating,
		participant: question.participant,
		answered: question.answered,
		likedBy: question.likedBy,
		dislikedBy: question.dislikedBy,
		tags,
		createdAt: question.createdAt,
		updatedAt: question.updatedAt,
	};
}
