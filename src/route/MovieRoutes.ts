
import express from 'express';
import {getMovie, getMovieLiked} from "../controller/movie/MovieController";
const router = express.Router();
router.post("/getMovie", getMovie);
router.get("/getMovieLiked", getMovieLiked);
export default router;