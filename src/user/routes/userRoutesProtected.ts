import express from 'express';
import { preferenceGenre } from "../controllers/PreferenceController";
import {verifyAccessToken} from "./verifyAccessToken";
import {getPreferences} from "../controllers/getPreferences";

const protectedRouter = express.Router();

protectedRouter.post('/preferenceGenre', preferenceGenre);
protectedRouter.get('/verifyAccessToken',verifyAccessToken);
protectedRouter.get('/getPreferences',getPreferences);

export default protectedRouter;
