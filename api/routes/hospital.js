import express from "express";
import { getPatients,
         deleteHospital,
         getHospital, 
         getHospitals, 
         updateHospital } from "../controllers/hospital.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Update HOSPITAL
router.put("/:id",verifyAdmin, updateHospital);

//DELETE HOSPITAL
router.delete("/:id",verifyAdmin, deleteHospital);

 //GET  HOSPITAL
 router.get("/:id", getHospital);

 //GET ALL HOSPITAL
 router.get("/ho", getHospitals);

 //GET ALL PATIENTS
 router.get("/", getPatients)


export default router