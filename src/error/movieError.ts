export class MovieError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 400, message: string = `Movie Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class FailedToSaveMovieError extends MovieError{
    constructor() {
        super(500,'Failed to save movie');
    }
}
export class FailedToGetMovieError extends MovieError{
    constructor() {
        super(404,'Failed to get movie');
    }
}
export class FailedToCheckIfExistingMovieError extends MovieError{
    constructor() {
        super(500,'Failed to check if existing movie');
    }
}
export class FailedToFetchMovieError extends MovieError{
    constructor() {
        super(404,'Failed to fetch movie');
    }
}
export class FailedToFetchMovieDurationError extends MovieError{
    constructor() {
        super(404,'Failed to fetch movie duration');
    }
}
export class FailedToFetchMovieVideoError extends MovieError{
    constructor() {
        super(404,'Failed to fetch movie video');
    }
}
export class FailedToTransformMovieData extends MovieError{
    constructor() {
        super(500,'Failed to transform movie data');
    }
}
export class FailedToGetGroupMovieError extends MovieError{
    constructor() {
        super(404,'Failed to get group movie');
    }
}