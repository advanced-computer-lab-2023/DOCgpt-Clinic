import express from "express";
import { createHealthRecord } from "../controllers/healthRecordController";

const router = express.Router();

router.post("/", createHealthRecord);
export default router;