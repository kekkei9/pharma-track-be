import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.post("/getDoctorShifts", controller.getDoctorAvailableShifts);

router.put("/updateDoctorShift", controller.updateDoctorShiftStatus);

export default router;
