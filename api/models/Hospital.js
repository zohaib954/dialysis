import mongoose from "mongoose";
 

const HospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
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
        unique:true,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:true,
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    photos:{
        type:[String]
    },
    desc:{
        type:String,
        
    },
   
}
);

export default mongoose.model("Hospital", HospitalSchema)