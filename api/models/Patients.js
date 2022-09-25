import mongoose from "mongoose";
 

const PatientSchema = new mongoose.Schema({
    patientName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    hospitalId:{
        type:Number,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    }
   
  
},
{ timestamps:true }
);

export default mongoose.model("Patients", PatientSchema)