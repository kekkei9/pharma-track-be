import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getPrescription);
router.post("/id_prescription", controller.getPrescriptionByIDPrescription);
// router.get("/date_medical", controller.getPrescriptionByDateMedical);

router.post("/", controller.insertPrescription);

router.put("/", controller.updatePrescription);

router.delete("/", controller.deletePrescription);

export default router;
