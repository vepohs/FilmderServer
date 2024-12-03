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
