import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getAppointment);

router.get("/id_user", controller.getAppointmentWithIdUser);

router.get("/id_clinic", controller.getAppointmentByIdClinic);

router.get("/id_staff", controller.getAppointmentByIdStaff);

router.get("/id_appointment", controller.getAppointmentByIdAppointment);

router.post("/", controller.insertAppointment);

router.put("/", controller.updateAppointmentStatus);

router.delete("/:id_appointment", controller.deleteAppointment);

export default router;
