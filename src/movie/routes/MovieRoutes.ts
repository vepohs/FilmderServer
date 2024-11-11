
import express from 'express';
import {getMovie} from "../controllers/MovieController";
const router = express.Router();
router.post("/getMovie", getMovie);
export default router;