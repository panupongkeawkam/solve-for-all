import { PreviewTagDto } from "../dto/previewTag.dto";

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
