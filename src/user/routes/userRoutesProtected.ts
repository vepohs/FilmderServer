import express from 'express';
import { preferenceGenre } from "../controllers/PreferenceController";

const protectedRouter = express.Router();

protectedRouter.post('/preferenceGenre', preferenceGenre);
protectedRouter.post('/test');

export default protectedRouter;
