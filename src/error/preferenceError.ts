export class PreferenceError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 400, message: string = `Preference Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class FailedToSaveGenrePreferenceError extends PreferenceError {
    constructor() {
        super(500, 'Failed to save genre preference');
    }
}

export class FailedToSaveProviderPreferenceError extends PreferenceError {
    constructor() {
        super(500, 'Failed to save provider preference');
    }
}

export class FailedToGetGenrePreferenceError extends PreferenceError {
    constructor() {
        super(404, 'Failed to  get genre preference');
    }
}

export class FailedToGetProviderPreferenceError extends PreferenceError {
    constructor() {
        super(404, 'Failed to  get provider preference');
    }
}