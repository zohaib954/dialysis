import Rooms from "../models/Rooms.js";
import Hotels from "../models/Hotels.js";
import {createError} from "../utils/error.js";

//Create Room and update rooms in hotel DB
export const createRoom = async (req,res,next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Rooms(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotels.findByIdAndUpdate(hotelId, {
                $push : {rooms: savedRoom._id}
            });
        } catch (err){
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch(err){
        next(err);
    }
};


//UPDATE Room
export const updateRoom = async (req,res) =>{
    
    try{
     const updateRoom = await Rooms.findByIdAndUpdate(
         req.params.id,
         {$set: req.body},
         {new:true}
     );
     res.status(200).json(updateRoom);
    } catch(err){
     return err;
    }
 }
 
 //DELETE ROOM
 export const deleteRoom = async (req,res) =>{
    const hotelId = req.params.hotelid;
     try{
         await Rooms.findByIdAndDelete(req.params.id);
         try{
            await Hotels.findByIdAndUpdate(hotelId,{
                $pull: {rooms: req.params.id},
            });
         } catch(err){
            next(err);
         }
         res.status(200).json("Room has been Deleted");
        } catch(err){
         next(err);
        }
 }
 
 // GET ROOM
 export const getRoom = async (req,res) =>{
     try{
         const room = await Rooms.findById(req.params.id);
         res.status(200).json(room);
        } catch(err){
             next(err);
        }
 }
 
 //GET All ROOM
 export const getRooms = async (req,res) =>{
     try{
         const rooms = await Rooms.find();
         res.status(200).json(rooms);
        } catch(err){
             next(err);
        }
 }