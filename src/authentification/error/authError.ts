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
        super(400, `Refresh token is missing`);
    }
}

export class BadRefreshToken extends AuthError {
    constructor() {
        super(400, `BadRefreshToken`);
    }
}

export class NoPayload extends AuthError {
    constructor() {
        super(400, `No payload`);
    }
}