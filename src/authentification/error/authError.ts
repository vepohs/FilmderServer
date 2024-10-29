export class AuthError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 400, message: string = `Authentification error occurred`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class badCredentialsError extends AuthError {
    constructor() {
        super(401, `Mail or password incorrect`);
    }
}