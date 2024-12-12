export class SwipeError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 500, message: string = `Swipe Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class FailedToSaveSwipeError extends SwipeError {
    constructor() {
        super(500, 'Failed to save swipe');
    }
}
