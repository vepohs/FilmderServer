
import express from 'express';
import {test} from "../authentification/controllers/protectedTestController";

const router = express.Router();
router.post('/test', test);
export default router

