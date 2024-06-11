import pool from "../../db.js";
import queries from "./queries.js";
import {
  checkClinicExists,
  checkStaffExists,
} from "../checkForeignKeyContraint.js";
const checkAppointmentExist = async (id_appointment) => {
  try {
    const results = await pool.query(queries.findAppointmentWithID, [
      id_appointment,
    ]);
    if (!results.rows.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const getAppointment = async (req, res) => {
  try {
    const results = await pool.query(queries.getAppointment);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const insertAppointment = async (req, res) => {
  try {
    const {
      time,
      doctor,
      test,
      number,
      address,
      status,
      id_clinic,
      id_user,
      id_staff,
    } = JSON.parse(req.body);

    if (!(await checkClinicExists(id_clinic))) {
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

    if (!(await checkStaffExists(id_staff))) {
      res.status(404).json({
        results: "that bai",
        message:
          "khong tim thay staff voi id tren, vi pham rang buoc khoa ngoai",
        data: {
          id_clinic: id_clinic,
        },
      });
      return;
    }

    await pool.query(queries.insertAppointment, [
      time,
      doctor,
      test,
      number,
      address,
      status,
      id_clinic,
      id_user,
      id_staff,
    ]);
    const results1 = await pool.query(queries.findAppointmentID, [
      time,
      doctor,
      id_clinic,
      id_staff,
    ]);
    res.status(200).json({
      results: "thanh cong",
      message: "them appointment thanh cong",
      data: {
        id_appointment: results1.rows[0].id_appointment,
        time: time,
        doctor: doctor,
        test: test,
        number: number,
        address: address,
        status: status,
        id_clinic: id_clinic,
        id_user: id_user,
        id_staff: id_staff,
      },
    });
  } catch (error) {
    throw error;
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id_appointment, status } = JSON.parse(req.body);
    const results = await checkAppointmentExist(id_appointment);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay appointment voi id tren",
        data: {
          id_appointment: id_appointment,
        },
      });
      return;
    }

    await pool.query(queries.updateAppointmentStatus, [status, id_appointment]);
    res.status(200).json({
      results: "thanh cong",
      message: "appointment cap nhat thanh cong",
      data: {
        id_appointment: id_appointment,
        status: status,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const id_appointment = req.params.id_appointment;
    const results = await checkAppointmentExist(id_appointment);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay appointment voi id o duoi",
        data: {
          id_appointment: id_appointment,
        },
      });
      return;
    }
    await pool.query(queries.deleteAppointment, [id_appointment]);
    res.status(200).json({
      results: "thanh cong",
      message: "appointment xoa thanh cong",
      data: {
        id_appointment: id_appointment,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getAppointmentWithIdUser = async (req, res) => {
  try {
    const id_user = req.query.id_user;
    const results = await pool.query(queries.getAppointmentWithIdUser, [
      id_user,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getAppointmentByIdClinic = async (req, res) => {
  try {
    const id_clinic = req.query.id_clinic;
    const results = await pool.query(queries.getAppointmentByIdClinic, [
      id_clinic,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getAppointmentByIdStaff = async (req, res) => {
  try {
    const id_staff = req.query.id_staff;
    const results = await pool.query(queries.getAppointmentByIdStaff, [
      id_staff,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getAppointmentByIdAppointment = async (req, res) => {
  try {
    const id_appointment = req.query.id_appointment;
    const results = await pool.query(queries.getAppointmentByIdAppointment, [
      id_appointment,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

export default {
  getAppointment,
  insertAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentWithIdUser,
  getAppointmentByIdClinic,
  getAppointmentByIdStaff,
  getAppointmentByIdAppointment,
};
