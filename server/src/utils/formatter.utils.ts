import { PreviewTagDto } from "src/tag/dto/previewTag.dto";
import { PreviewQuestionDto } from "../question/dto/previewQuestion.dto";
import { PreviewUserDto } from "src/user/dto/previewUser.dto";
import { PreviewAnswerDto } from "src/answer/dto/previewAnswer.dto";

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
