import Hospital from "../models/Hospital.js";
import Doctors from "../models/Doctors.js";
import Patients from "../models/Patients.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createError } from "../utils/error.js";
import jsonwebtoken from "jsonwebtoken";
dotenv.config()

//Register Hospital
export const registerHospital = async (req,res,next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newHospital = new Hospital({
            name:req.body.name,
            email : req.body.email,
            address : req.body.address,
            city : req.body.city,
            hospitalId : req.body.hospitalId,
            password : hash
        })

        await newHospital.save()
        res.status(200).send("Hospital has been created")
    } catch(err){
        next(err);
    }
}

//Register Doctor
export const registerDoctor = async (req,res,next) => {
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newDoctor = new Doctors({
            docName:req.body.docName,
            docEmail : req.body.docEmail,
            password : hash,
            docId: req.body.docId,
            designation: req.body.designation,
            hospitalId: req.body.hospitalId,
            desc: req.body.desc,
        })

        await newDoctor.save()
        res.status(200).send("Doctor has been created")
    } catch(err){
        next(err);
    }
}

//Register Patients
export const registerPatients = async (req,res,next) => {
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newPatient = new Patients({
            patientName:req.body.patientName,
            email : req.body.email,
            password : hash,
            hospitalId: req.body.hospitalId,
            phone: req.body.phone
        })

        await newPatient.save()
        res.status(200).send("Patient has been created")
    } catch(err){
        next(err);
    }
}


//log in Hospital
export const hospitalLogin = async (req,res,next) => {
    try{
        const hospital = await Hospital.findOne({name:req.body.name})
        if(!hospital) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, hospital.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or user name!"))

        const token = jsonwebtoken.sign({id:hospital._id, isAdmin: hospital.isAdmin}, process.env.JWT);
        
        const {password,_id, isAdmin, ...otherDetails} = hospital._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails});
    } catch(err){
        next(err);
    }
}

//log in Doctors
export const doctorLogin = async (req,res,next) => {
    try{
        const doctor = await Doctors.findOne({docName:req.body.docName})
        if(!doctor) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, doctor.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or user name!"))

        const token = jsonwebtoken.sign({id:doctor._id, isAdmin: doctor.isAdmin}, process.env.JWT);
        
        const {password, isAdmin, ...otherDetails} = doctor._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails});
    } catch(err){
        next(err);
    }
}

//log in patients
export const patientLogin = async (req,res,next) => {
    try{
        const patient = await Patients.findOne({patientName:req.body.patientName})
        if(!patient) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, patient.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or user name!"))

        const token = jsonwebtoken.sign({id:patient._id, isAdmin: patient.isAdmin}, process.env.JWT);
        
        const {password, isAdmin, ...otherDetails} = patient._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails});
    } catch(err){
        next(err);
    }
}