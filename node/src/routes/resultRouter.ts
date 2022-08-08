import express from "express";
import { rank, search, summary } from "../controllers/result";

const router = express.Router();

router.get("/search", search);
router.get("/summary", summary);
router.get("/rank", rank);

export default router;
