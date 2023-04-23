export class InteractWithQuestionDto { 
    _id: string;
    userId: string;
    payload: { 
        participant: number;
        rating: number;
        action: string;
    }
}