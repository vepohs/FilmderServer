export class MovieGroupError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 400, message: string = `MovieGroup Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class FailedToSaveSwipeMovieGroupError extends MovieGroupError {
    constructor() {
        super(500, 'Failed to save swipe movie group');
    }
}

export class FailedToGetMovieGroupError extends MovieGroupError {
    constructor() {
        super(500, 'Failed to get movie group');
    }
}
