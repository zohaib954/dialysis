import Hospital from "../models/Hospital.js";
import Patients from "../models/Patients.js";
import { createError } from "../utils/error.js";




//UPDATE HOSPITAL
export const updateHospital = async (req,res) =>{
    
   try{
    const updateHospital = await Hospital.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new:true}
    );
    res.status(200).json(updateHospital);
   } catch(err){
    return err;
   }
}

//DELETE HOSPITAL
export const deleteHospital = async (req,res) =>{
    try{
        await Hospital.findByIdAndDelete(req.params.id);
        res.status(200).json("Hospital has been Deleted");
       } catch(err){
        next(err);
       }
}

// GET HOSPITAL
export const getHospital = async (req,res,next) =>{
    try{
        const hospital = await Hospital.findById(req.params.id);
        res.status(200).json(hospital);
       } catch(err){
            next(err);
       }
}

//GET All HOSPITAL
export const getHospitals = async (req,res) =>{
    try{
        const hospital = await Hospital.find();
        res.status(200).json(Hospital);
       } catch(err){
            next(err);
       }
}

//GET All PATIENTS
export const getPatients = async (req,res,next) =>{
   
    try{
        const patient = await Patients.find();
        res.status(200).json(patient);
       } catch(err){
            next(err);
       }
}

