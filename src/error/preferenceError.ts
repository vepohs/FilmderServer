export class PreferenceError extends Error {
    public readonly statusCode: number;

//todo vérifier les codes d'error
    constructor(statusCode: number = 400, message: string = `Preference Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class CannotSaveGenrePreferenceError extends PreferenceError {
    constructor(error: string) {
        super(500, error);
    }
}

export class CannotSaveProviderPreferenceError extends PreferenceError {
    constructor(error: string) {
        super(500, error);
    }
}

export class CannotGetGenrePreferenceError extends PreferenceError {
    constructor(error: string) {
        super(500, error);
    }
}

export class CannotGetProviderPreferenceError extends PreferenceError {
    constructor(error: string) {
        super(500, error);
    }
}