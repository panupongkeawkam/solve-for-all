import { PreviewTagDto } from "src/tag/dto/previewTag.dto";
import { PreviewQuestionDto } from "../question/dto/previewQuestion.dto";

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

export function previewTagFormat(
	tag: any,
	questions: any,
): PreviewTagDto | null {
	return {
		_id: tag?._id,
		name: tag?.name,
		totalQuestion: tag?.questions.length,
		questions: questions,
		createdAt: tag?.createdAt,
	};
}
