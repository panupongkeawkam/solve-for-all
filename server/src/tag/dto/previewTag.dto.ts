import { PreviewQuestionDto } from "../../question/dto/previewQuestion.dto";

export class PreviewTagDto {
	_id: string;
	name: string;
	totalQuestion: number;
	questions: PreviewQuestionDto[];
	createdAt: Date;
}
