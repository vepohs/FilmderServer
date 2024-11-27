
import express from 'express';
import {getMovie, getMovieLiked} from "../controller/movie/MovieController";
import {getGroupMovie} from "../controller/movie/getGroupMovieController";
const router = express.Router();
router.post("/getMovie", getMovie);
router.get("/getMovieLiked", getMovieLiked);
router.get("/getGroupMovie", getGroupMovie);
export default router;