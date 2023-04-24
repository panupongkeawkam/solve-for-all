export class PreviewAnswerDto {
	_id: string;
	answeredBy: {
		_id: string;
		name: string;
		username: string;
		image: string;
	};
	answeredIn: string;
	body: string[];
	replies: string[];
	likedBy: string[];
	rating: number;
	dislikedBy: string[];
	isSolved: boolean;
	createdAt: Date;
}
