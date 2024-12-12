export class AuthError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 400, message: string = `Authentification error occurred`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadCredentialsError extends AuthError {
    constructor() {
        super(401, `Mail or password incorrect`);
    }
}

export class RefreshTokenError extends AuthError {
    constructor() {
        super(401, `Refresh token is missing`);
    }
}

export class BadAccessTokenError extends AuthError {
    constructor() {
        super(401, `BadAccessToken`);
    }
}

export class BadRefreshTokenError extends AuthError {
    constructor() {
        super(401, `BadRefreshToken`);
    }
}

export class NoRefreshTokenError extends AuthError {
    constructor() {
        super(401, `NoRefreshToken`);
    }
}

export class NoAccessTokenError extends AuthError {
    constructor() {
        super(401, `NoAccessToken`);
    }
}

export class FailedToSaveRefreshTokenError extends AuthError {
    constructor() {
        super(500, `Failed to save refresh token`);
    }
}
export class FailedToDeleteRefreshTokenError extends AuthError {
    constructor() {
        super(500, `Failed to delete refresh token`);
    }
}
export class FailedToGenerateAccessTokenError extends AuthError {
    constructor() {
        super(500, `Failed to save access token`);
    }
}
export class FailedToGenerateRefreshTokenError extends AuthError {
    constructor() {
        super(500, `Failed to delete access token`);
    }
}