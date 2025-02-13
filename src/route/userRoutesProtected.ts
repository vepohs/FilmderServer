import express from 'express';
import { setPreference } from "../controller/user/setPreferenceController";
import {verifyAccessToken} from "./verifyAccessToken";
import {getPreferences} from "../controller/user/getPreferencesController";
import {getUserPreference} from "../controller/user/getUserPreferenceController";
import {swipeMovie} from "../controller/movie/swipeMovie";
import {getGroup} from "../controller/user/getGroup";
const protectedRouter = express.Router();

protectedRouter.get('/verifyAccessToken',verifyAccessToken);
protectedRouter.post('/setPreferences', setPreference);
protectedRouter.get('/getPreferences',getPreferences);
protectedRouter.get('/getUserPreferences',getUserPreference);
protectedRouter.post('/swipeMovie',swipeMovie);
protectedRouter.get('/getGroup',getGroup);

export default protectedRouter;
