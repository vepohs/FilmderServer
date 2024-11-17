import express from "express";
import {groupAdd} from "../../group/groupAddController";

const router = express.Router();

router.post('/groupAdd',groupAdd);
export default router;
