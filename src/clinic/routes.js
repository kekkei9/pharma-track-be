import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getClinic);
router.post("/id_clinic", controller.getClinicByID_Clinic);
router.post("/tinh_thanhpho", controller.Search_TinhThanhPho);
router.post(
  "/tinh_thanhpho/quan_huyen",
  controller.Search_TinhThanhPho_QuanHuyen
);
router.post(
  "/tinh_thanhpho/quan_huyen/diachi",
  controller.Search_TinhThanhPho_QuanHuyen_DiaChi
);

router.post("/", controller.insertClinic);

router.put("/", controller.updateMultipleClinic);
router.put("/status", controller.updateClinicStatus)
router.put("/attribute",controller.updateClinicByAttribute)

router.delete("/", controller.deleteClinic);

export default router;
