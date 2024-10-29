// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import {AlreadyExistsError, EmptyFieldError, UserError} from "../user/error/userError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UserError) {
        console.error("User error:", err);
        res.status(err.statusCode).json({ message: err.message,resource: err.resource });
    }

    else {
        console.error("Unexpected error:", err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};
