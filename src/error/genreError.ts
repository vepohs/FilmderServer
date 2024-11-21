export class GenreError extends Error {
    public readonly statusCode: number;

//todo vérifier les codes d'error et les gestion des erreurs
    constructor(statusCode: number = 400, message: string = `Group Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class CannotSaveGenreError extends GenreError {
    constructor(error: string) {
        super(500, error);
    }
}
export class NoGenreError extends GenreError {
    constructor() {
        super(400,'NO GENRE FOUND');
    }
}