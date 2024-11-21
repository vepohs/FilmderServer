export class MovieError extends Error {
    public readonly statusCode: number;
//todo vérifier les codes d'error
    constructor(statusCode: number = 400, message: string = `Movie Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class CannotSaveMovieError extends MovieError{
    constructor(error:string) {
        super(500,error);
    }
}
export class CannotGetMovieError extends MovieError{
    constructor(error:string) {
        super(500,error);
    }
}
export class CannotCheckIfExistingMovieError extends MovieError{
    constructor(error:string) {
        super(500,error);
    }
}