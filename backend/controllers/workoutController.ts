import { Request, Response } from 'express';
//import { Workout } from '../models/workoutModel';
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async(req: Request, res:Response) => {
    const workouts = await Workout.find({}).sort({createdAt : -1})
    
    res.status(200).json(workouts)
}


//get a single workout
const getWorkout = async(req: Request, res:Response) =>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(400).json({error : 'No such workout'})
    }
    res.status(200).json(workout)
}



//create a new workout
const createWorkout = async(req: Request, res: Response) => {
    const {title, load, reps} : { title: String; load: Number; reps: Number } = req.body
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch (error : any){
        res.status(400).json({error: error.message})
    }
}




//delete a workout
const deleteWorkout = async (req:Request, res:Response) =>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(400).json({error : 'No such workout'})
    }
    res.status(200).json(workout)
}




//update a workout
const updateWorkout = async(req:Request, res: Response) =>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body 
    })
    
    if(!workout) {
        return res.status(400).json({error : 'No such workout'})
    }
    res.status(200).json(workout)
}



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}