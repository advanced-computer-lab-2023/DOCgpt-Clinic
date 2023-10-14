"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Workout } from '../models/workoutModel';
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
//get all workouts
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workouts = yield Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
});
//get a single workout
const getWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }
    const workout = yield Workout.findById(id);
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
});
//create a new workout
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, load, reps } = req.body;
    try {
        const workout = yield Workout.create({ title, load, reps });
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete a workout
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }
    const workout = yield Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
});
//update a workout
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }
    const workout = yield Workout.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
});
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
