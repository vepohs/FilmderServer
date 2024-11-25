
import express from 'express';
import {getMovie} from "../controller/movie/MovieController";
const router = express.Router();
router.post("/getMovie", getMovie);
export default router;