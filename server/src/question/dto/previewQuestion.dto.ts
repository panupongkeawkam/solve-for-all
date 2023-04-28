export class PreviewQuestionDto {
	_id: string;
	createdBy: {
		image: string;
		name: string;
		username: string;
		_id: string;
	};
	solvedBy: string;
	title: string;
	body: string[];
	viewed: number;
	rating: number;
	participant: number;
	answered: number;
	likedBy: string[];
	dislikedBy: string[];
	tags: {
		_id: string;
		name: string;
	}[];
	createdAt: Date;
	updatedAt: Date;
}
