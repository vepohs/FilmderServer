import express from "express";
import {groupAdd} from "../../group/groupAddController";
import {groupJoin} from "../../group/groupJoinController";
import {groupMovieLiked} from "../../group/groupMovieLikedController";

const router = express.Router();

router.post('/groupAdd',groupAdd);
router.post('/groupJoin',groupJoin);
router.get('/groupMovieLiked',groupMovieLiked);
export default router;
