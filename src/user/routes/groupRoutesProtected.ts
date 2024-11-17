import express from "express";
import {groupAdd} from "../../group/groupAddController";
import {groupJoin} from "../../group/groupJoinController";

const router = express.Router();

router.post('/groupAdd',groupAdd);
router.post('/goupJoin',groupJoin);
export default router;
