import express from 'express';
import { preferenceGenre } from "../controllers/PreferenceController";
import {verifyAccessToken} from "./verifyAccessToken";

const protectedRouter = express.Router();

protectedRouter.post('/preferenceGenre', preferenceGenre);
protectedRouter.post('/verifyAccessToken',verifyAccessToken);

export default protectedRouter;
