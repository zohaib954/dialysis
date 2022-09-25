import Users from "../models/User.js";


//UPDATE USER
export const updateUser = async (req,res) =>{
    
   try{
    const updateUser = await Users.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new:true}
    );
    res.status(200).json(updateUser);
   } catch(err){
    next(err);
   }
}

// DELETE USER
export const deleteUser = async (req,res) =>{
    try{
        await Users.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been Deleted");
       } catch(err){
        next(err);
       }
}

// GET user
export const getOneUser = async (req,res) =>{
    try{
        const user = await Users.findById(req.params.id);
        res.status(200).json(user);
       } catch(err){
            console.log(err);
       }
}

//GET All user
export const getUsers = async (req,res) =>{
    try{
        const users = await Users.find();
        res.status(200).json(users);
       } catch(err){
            next(err);
       }
}