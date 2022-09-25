import express from "express";
import {hospitalLogin,
        doctorLogin,
        patientLogin,
        registerHospital,
        registerDoctor, 
        registerPatients 
        } from "../controllers/auth.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register/hospital", registerHospital)
router.post("/register/doctor",verifyAdmin, registerDoctor)
router.post("/register/patient",verifyAdmin, registerPatients)

router.post("/login/hospital", hospitalLogin) 
router.post("/login/doctor", doctorLogin) 
router.post("/login/patient", patientLogin) 

export default router