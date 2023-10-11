import express, { Router } from 'express';
import { createdoctor } from '../controllers/doctorController';
const router = Router();

router.post('/postDoctor', createdoctor);
export default router;