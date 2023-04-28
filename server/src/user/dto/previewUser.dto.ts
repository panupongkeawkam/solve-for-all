import { PreviewQuestionDto } from "../../question/dto/previewQuestion.dto";
import { Tag } from "../../tag/dto/tag.dto";

export class PreviewUserDto {
	_id: string;
	username: string;
	email: string;
	name: string;
	image: string;
	tags: Tag[];
	bio: string;
	birthday: Date;
	reputation: number;
	answered: number;
	solved: number;
	questions: PreviewQuestionDto[];
}
