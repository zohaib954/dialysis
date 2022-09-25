import mongoose from "mongoose";
 

const DoctorSchema = new mongoose.Schema({
    docName:{
        type:String,
        required:true,
        unique: true,
    },
    docEmail:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true
    },
    docId:{
        type:Number,
        required:true,
        unique: true,
    },
    isDoctor:{
        type:Boolean,
        default:true,
    },
    designation:{
        type:String,
        required:true,
    },
    hospitalId:{
        type:Number,
        required:true
    },
   
},
{ timestamps:true }
);



export default mongoose.model("Doctor", DoctorSchema)