import { Request, Response } from 'express';
import { UserError } from "../error/userError";
import { AuthError } from "../error/authError";
import { GenreError } from "../error/genreError";
import { GroupError } from "../error/groupError";
import { MovieError } from "../error/movieError";
import { PreferenceError } from "../error/preferenceError";

export const errorHandler = (err: Error, req: Request, res: Response,) => {
    const errorTypes = [UserError, AuthError, GenreError, GroupError, MovieError, PreferenceError];


    if (errorTypes.some((ErrorClass) => err instanceof ErrorClass)) {
        console.error(`[${err.constructor.name}] ${err.message}`);
        console.error(err.stack);
        res.status((err as any).statusCode || 500).json({ message: "An error occurred." });
    } else {
        console.error("[Unhandled Error] ", err);
        console.error(err.stack);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
};
