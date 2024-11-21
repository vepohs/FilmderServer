// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import {AlreadyExistsError, EmptyFieldError, UserError} from "../error/userError";
import {AuthError} from "../error/authError";

export const errorHandler = (err: Error, req: Request, res: Response) => {
    if (err instanceof UserError) {
        res.status(err.statusCode).json({ message: err.message,resource: err.resource });
    }
if(err instanceof AuthError){
    res.status(err.statusCode).json({ message: err.message });

}
    else {
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};
