export class InteractWithQuestionDto {
	_id: string;
	userId: string;
	payload: {
		rating: number;
		action: string;
	};
}
