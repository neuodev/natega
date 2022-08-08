import express from "express";
import { getResults, rank, search, summary } from "../controllers/result";

const router = express.Router();

router.get("/search", search);
router.get("/summary", summary);
router.get("/rank", rank);
router.get("/results", getResults);

export default router;
