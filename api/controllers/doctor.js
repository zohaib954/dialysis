import Doctors from "../models/Doctors.js";
import { createError } from "../utils/error.js";


//Create Doctors
export const createDoctor = async (req,res) =>{
    const newDoctor = new Doctors(req.body)
   try{
    const savedDoctor = await newDoctor.save()
    res.status(200).json(savedDoctor)
   } catch(err){
    next(createError(401, "You are not Authenticated!"));
   }
}

//UPDATE Doctors
export const updateDoctor = async (req,res) =>{
    
   try{
    const updateHotel = await Doctors.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new:true}
    );
    res.status(200).json(updateDoctor);
   } catch(err){
    return err;
   }
}

//DELETE Doctors
export const deleteDoctor = async (req,res) =>{
    try{
        await Doctors.findByIdAndDelete(req.params.id);
        res.status(200).json("Doctor has been Deleted");
       } catch(err){
        next(err);
       }
}

// GET Doctor
export const getDoctor = async (req,res) =>{
    try{
        const doctor = await Doctors.findById(req.params.id);
        res.status(200).json(doctor);
       } catch(err){
            next(err);
       }
}

//GET All Doctors
export const getDoctors = async (req,res) =>{
    try{
        const doctors = await Doctors.find();
        res.status(200).json(doctor);
       } catch(err){
            next(err);
       }
}

