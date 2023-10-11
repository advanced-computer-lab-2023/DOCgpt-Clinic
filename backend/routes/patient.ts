import express from 'express';
import { addFamilyMember } from '../controllers/patientController';
import { viewFamilyMembers } from '../controllers/patientController';


const router = express.Router();
router.use(express.json());

// Add family member
router.put('/:id', addFamilyMember);

// view family members
router.get('/:id', viewFamilyMembers);

export default router;
