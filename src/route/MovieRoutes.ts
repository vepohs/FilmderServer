
import express from 'express';
import {getMovie, getMovieLiked} from "../controller/movie/movieController";
import {getGroupMovie} from "../controller/movie/getGroupMovieController";
import {verifyGroup} from "../middlewares/VerifyGroup";
const router = express.Router();
router.post("/getMovie", getMovie);
router.get("/getMovieLiked", getMovieLiked);
router.post("/getGroupMovie", verifyGroup,getGroupMovie);
export default router;