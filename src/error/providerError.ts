export class ProviderError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 500, message: string = `Provider Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class FailedToSaveProviderError extends ProviderError {
    constructor() {
        super(500, 'Failed to save provider');
    }
}

export class FailedToGetProviderError extends ProviderError {
    constructor() {
        super(404, 'No provider found');
    }
}
export class FailedToFetchProviderError extends ProviderError {
    constructor() {
        super(500, 'Failed to fetch provider');
    }
}
export class NoProviderFoundError extends ProviderError {
    constructor() {
        super(404, 'No provider found');
    }
}
