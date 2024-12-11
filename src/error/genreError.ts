export class GenreError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 500, message: string = `Genre Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class FailedToSaveGenreError extends GenreError {
    constructor() {
        super(500, 'Failed to save genre');
    }
}
export class FailedToGetGenre extends GenreError {
    constructor() {
        super(404,'No genre found');
    }
}