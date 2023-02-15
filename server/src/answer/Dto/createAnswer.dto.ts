import {IsNotEmpty} from "class-validator";

export class CreateAnswerDto {

	answeredBy: string;
	answeredIn: string;
	title: string;
	description: string;
	body: string[];
	likedBy: string[];
	dislikedBy: string[];
	rating: Number;
	replies: string[];
	isSolve: boolean;
}
