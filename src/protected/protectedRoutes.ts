import express from 'express';
import {preferenceGenre} from "../user/controllers/PreferenceController";

const protectedRouter = express.Router();
const router = express.Router();
export default protectedRouter;
