export class PreviewReplyDto {
	_id: string;
	repliedBy: {
		_id: string;
		name: string;
		username: string;
		image: string;
	};
	repliedIn: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
}
