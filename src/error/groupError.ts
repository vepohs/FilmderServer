export class GroupError extends Error {
    public readonly statusCode: number;
//todo vérifier les codes d'error
    constructor(statusCode: number = 400, message: string = `Group Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class NoGroupError extends GroupError {
    constructor() {
        super(400,'NoGroupExisting');
    }
}
export class AlreadyInGroupError extends GroupError {
    constructor() {
        super(400,'Already in a group');
    }
}
export class CannotSaveGroupError extends GroupError{
    constructor(error:string) {
        super(500,error);
    }
}