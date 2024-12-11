export class GroupError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 400, message: string = `Group Error occured`) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class NoGroupError extends GroupError {
    constructor() {
        super(404,'NoGroupExisting');
    }
}
export class AlreadyInGroupError extends GroupError {
    constructor() {
        super(409,'Already in a group');
    }
}
export class FailedToSaveGroupError extends GroupError{
    constructor() {
        super(500,'Failed to save group');
    }
}
export class FailedToJoinGroupError extends GroupError{
    constructor() {
        super(500,'Failed to join group');
    }
}
export class FailedToSaveGroupPreferenceError extends GroupError{
    constructor() {
        super(500,'Failed to save group preference');
    }
}
export class FailedToGetGroupError extends GroupError{
    constructor() {
        super(404,'Failed to get group');
    }
}
export class FailedToGetGroupGenrePreferenceError extends GroupError{
    constructor() {
        super(404,'Failed to get group genre preference');
    }
}
export class FailedToGetGroupProviderPreferenceError extends GroupError{
    constructor() {
        super(404,'Failed to get group provider preference');
    }
}