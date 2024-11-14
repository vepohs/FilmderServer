import express from 'express';
import { setPreference } from "../controllers/setPreferenceController";
import {verifyAccessToken} from "./verifyAccessToken";
import {getPreferences} from "../controllers/getPreferencesController";
import {getUserPreference} from "../controllers/getUserPreferenceController";

const protectedRouter = express.Router();

protectedRouter.get('/verifyAccessToken',verifyAccessToken);
protectedRouter.post('/setPreferences', setPreference);
protectedRouter.get('/getPreferences',getPreferences);
protectedRouter.get('/getUserPreferences',getUserPreference);

export default protectedRouter;
