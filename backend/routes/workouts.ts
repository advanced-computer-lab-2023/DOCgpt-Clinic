import express, { Request, Response, Router } from 'express';
//import { Workout } from '../models/workoutModel';
//const Workout = require('../models/workoutModel')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router: Router = express.Router();

// GET all packages
router.get('/', getWorkouts)

// GET a single package
router.get('/:id', getWorkout)
    

// POST a new package
router.post('/', createWorkout) 

// DELETE a package
router.delete('/:id', deleteWorkout)

// UPDATE a package
router.put('/:id', updateWorkout)

export default router;