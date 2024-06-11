import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getStaff);

router.post("/doctorName", controller.getDoctorByName);

router.post("/staffDepartment", controller.getStaffByDepartment);

router.post("/staffByID", controller.getStaffByID);

router.post("/staffByClinicID", controller.getStaffByClinicID);

router.post("/", controller.insertStaff);

router.post("/insertStaffPlusDoctorTime", controller.insertStaffPlusDoctorTime);

router.put("/", controller.updateStaffType);

router.delete("/", controller.deleteStaff);

export default router;
