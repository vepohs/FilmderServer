
import express from 'express';
import {test} from "../authentification/controllers/testController";

const router = express.Router();
router.post('/test', test);
export default router

