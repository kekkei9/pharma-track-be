import pool from "../../db.js";
import queries from "./queries.js";

const getDoctorAvailableShifts = async (req, res) => {
  try {
    const { id_doctortime } = JSON.parse(req.body);
    const results = await pool.query(queries.getDoctorAvailableShifts, [
      id_doctortime,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const updateDoctorShiftStatus = async (req, res) => {
  try {
    const { id_doctortime, shift, action } = JSON.parse(req.body);
    if (action === "book")
      await pool.query(queries.bookDoctorShift, [id_doctortime, shift]);
    else await pool.query(queries.unbookDoctorShift, [id_doctortime, shift]);
    res.status(200).json({
      results: "thanh cong",
      message: `ca ${action} thanh cong`,
      data: {
        id_doctortime: id_doctortime,
        shift: shift,
        action: action,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getDoctorAvailableShifts,
  updateDoctorShiftStatus,
};
