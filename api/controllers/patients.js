import Patients from "../models/Patients";
import { createError } from "../utils/error.js";


//Create HOSPITAL
export const createPatients = async (req,res) =>{
    const newPatients = new Patients(req.body)
   try{
    const savedPatients = await newPatients.save()
    res.status(200).json(savedPatients)
   } catch(err){
    next(createError(401, "You are not Authenticated!"));
   }
}

//UPDATE HOSPITAL
export const updatePatients = async (req,res) =>{
    
   try{
    const updatePatients = await Patients.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new:true}
    );
    res.status(200).json(updatePatients);
   } catch(err){
    return err;
   }
}

//DELETE HOSPITAL
export const deletePatients = async (req,res) =>{
    try{
        await Patients.findByIdAndDelete(req.params.id);
        res.status(200).json("Patient has been Deleted");
       } catch(err){
        next(err);
       }
}

// GET HOSPITAL
export const getPatient = async (req,res) =>{
    try{
        const patient = await Patients.findById(req.params.id);
        res.status(200).json(patient);
       } catch(err){
            next(err);
       }
}

//GET All HOSPITAL
export const getPatients = async (req,res) =>{
    try{
        const patient = await Patients.find();
        res.status(200).json(patient);
       } catch(err){
            next(err);
       }
}

