"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { Workout } from '../models/workoutModel';
//const Workout = require('../models/workoutModel')
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const router = express_1.default.Router();
// GET all packages
router.get('/', getWorkouts);
// GET a single package
router.get('/:id', getWorkout);
// POST a new package
router.post('/', createWorkout);
// DELETE a package
router.delete('/:id', deleteWorkout);
// UPDATE a package
router.put('/:id', updateWorkout);
exports.default = router;
