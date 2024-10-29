export class UserError extends Error {
    public readonly statusCode: number;
    public readonly resource: string;

    constructor(resource: string, statusCode: number = 400, message: string = `${resource} error occurred`) {
        super(message);
        this.statusCode = statusCode;
        this.resource = resource;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class AlreadyExistsError extends UserError {
    constructor(resource: string) {
        super(resource, 409, `${resource} already exists`);
    }
}

export class EmptyFieldError extends UserError {
    constructor(resource: string) {
        super(resource, 400, `${resource} is empty`);
    }
}

export class SyntaxError extends UserError {
    constructor(resource: string) {
        super(resource, 400,`${resource} wrong syntax`);
    }
}

export class ComparePasswordsError extends UserError {
    constructor(resource: string) {
        super(resource, 400,`${resource} are not the same`);
    }
}

export class WeakPasswordError extends UserError {
    constructor(resource: string) {
        super(resource, 400,`${resource} is too weak`);
    }
}

export class NotValideNumber extends UserError {
    constructor(resource: string) {
        super(resource, 400,`${resource} is not a valide number`);
    }
}