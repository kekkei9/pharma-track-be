import pool from "../../db.js";
import queries from "./queries.js";
import { checkClinicExists } from "../checkForeignKeyContraint.js";
const checkStaffExist = async (id_staff) => {
  try {
    const results = await pool.query(queries.getStaffByID, [id_staff]);
    if (!results.rows.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const getStaff = async (req, res) => {
  try {
    const results = await pool.query(queries.getStaff);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const insertStaff = async (req, res) => {
  try {
    const { name, number, type, department, id_clinic } = JSON.parse(req.body);
    const results = await checkClinicExists(id_clinic);
    if (!results) {
      res.status(404).json({
        results: "that bai",
        message:
          "khong tim thay clinic voi id tren, vi pham rang buoc khoa ngoai",
        data: {
          id_clinic: id_clinic,
        },
      });
      return;
    }
    await pool.query(queries.insertStaff, [
      name,
      number,
      type,
      department,
      id_clinic,
    ]);
    const results1 = await pool.query(queries.findStaffID, [
      name,
      number,
      id_clinic,
    ]);
    res.status(200).json({
      results: "thanh cong",
      message: "them staff thanh cong",
      data: {
        id_staff: results1.rows[0].id_staff,
        name: name,
        number: number,
        type: type,
        department: department,
        id_clinic: id_clinic,
      },
    });
  } catch (error) {
    throw error;
  }
};

const updateStaffType = async (req, res) => {
  try {
    const { name, type } = JSON.parse(req.body);
    const results = await checkStaffExist(name);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay staff voi ten o duoi",
        data: {
          name: name,
        },
      });
      return;
    }

    await pool.query(queries.updateStaffType, [type, name]);
    res.status(200).json({
      results: "thanh cong",
      message: "cap nhat staff thanh cong",
      data: {
        name: name,
        type: type,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id_staff } = JSON.parse(req.body);
    const results = await checkStaffExist(id_staff);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay staff voi id o duoi",
        data: {
          id_staff: id_staff,
        },
      });
      return;
    }

    await pool.query(queries.deleteStaff, [id_staff]);
    await pool.query(queries.deleteDoctorTime, [id_staff]);
    res.status(200).json({
      results: "thanh cong",
      message: "xoa staff va doctortime thanh cong",
      data: {
        id_staff: id_staff,
      },
    });
  } catch (error) {
    throw error;
  }
};
const getDoctorByName = async (req, res) => {
  try {
    const { name } = JSON.parse(req.body);
    const results = await pool.query(queries.getDoctorByName, [name]);
    res.status(200).json(results.rows);
  } catch {
    throw error;
  }
};

const getStaffByDepartment = async (req, res) => {
  try {
    const { department } = JSON.parse(req.body);
    const results = await pool.query(queries.getStaffByDepartment, [
      department,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getStaffByID = async (req, res) => {
  try {
    const { id_staff } = JSON.parse(req.body);
    const results = await pool.query(queries.getStaffByID, [id_staff]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getStaffByClinicID = async (req, res) => {
  try {
    const { id_clinic } = JSON.parse(req.body);
    const results = await pool.query(queries.getStaffByClinicID, [id_clinic]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const insertStaffPlusDoctorTime = async (req, res) => {
  try {
    const { name, number, department, id_clinic } = JSON.parse(req.body);
    await pool.query(queries.insertStaff, [
      name,
      number,
      "Doctor",
      department,
      id_clinic,
    ]);

    const id_doctortime = (
      await pool.query(queries.findStaffID, [name, number, id_clinic])
    ).rows[0].id_staff;

    await pool.query(queries.insertDoctorTime, [
      id_doctortime,
      name,
      "8:00 - 9:00",
      false,
    ]);
    await pool.query(queries.insertDoctorTime, [
      id_doctortime,
      name,
      "9:00 - 10:00",
      false,
    ]);
    await pool.query(queries.insertDoctorTime, [
      id_doctortime,
      name,
      "10:00 - 11:00",
      false,
    ]);
    await pool.query(queries.insertDoctorTime, [
      id_doctortime,
      name,
      "11:00 - 12:00",
      false,
    ]);
    await pool.query(queries.insertDoctorTime, [
      id_doctortime,
      name,
      "13:00 - 14:00",
      false,
    ]);
    await pool.query(queries.insertDoctorTime, [
      id_doctortime,
      name,
      "14:00 - 15:00",
      false,
    ]);
    await pool.query(queries.insertDoctorTime, [
      id_doctortime,
      name,
      "15:00 - 16:00",
      false,
    ]);
    await pool.query(queries.insertDoctorTime, [
      id_doctortime,
      name,
      "16:00 - 17:00",
      false,
    ]);
    res.status(200).json({
      result: "thanh cong",
      message: "da them vao staff va doctortime",
      data: {
        id_staff: id_doctortime,
        name: name,
        number: number,
        department: department,
        id_clinic: id_clinic,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getStaff,
  insertStaff,
  updateStaffType,
  deleteStaff,
  getDoctorByName,
  getStaffByDepartment,
  getStaffByID,
  getStaffByClinicID,
  insertStaffPlusDoctorTime,
};
