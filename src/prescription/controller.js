import pool from "../../db.js";
import queries from "./queries.js";
import moment from "moment";
moment().format();

const checkPrescriptionExists = async (id_prescription) => {
  try {
    const results = await pool.query(queries.findPrescription, [
      id_prescription,
    ]);
    if (!results.rows.length) {
      return false;
    } else return true;
  } catch (error) {
    throw error;
  }
};

const getPrescription = async (req, res) => {
  try {
    const results = await pool.query(queries.getPrescription);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getPrescriptionByIDPrescription = async (req, res) => {
  try {
    const { id_prescription } = JSON.parse(req.body);
    const results = await pool.query(queries.findPrescription, [
      id_prescription,
    ]);
    if (!results.rows.length) {
      res.status(404).json({
        result: "That bai",
        reason: `Khong co don thuoc nao co ID ${id_prescription}`,
      });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (error) {
    throw error;
  }
};

const insertPrescription = async (req, res) => {
  try {
    const { id_prescription } = JSON.parse(req.body);
    const check = await checkPrescriptionExists(id_prescription);
    if (check === false) {
      await pool.query(queries.insertPrescription, [id_prescription]);
      res.status(200).json({
        results: "thanh cong",
        message: "them don thuoc thanh cong",
        data: {
          id_prescription: id_prescription,
          // image: image,
          // date_medical: date_medical
        },
      });
    } else {
      res.status(404).json({
        results: "that bai",
        message: "da ton tai don thuoc voi id o duoi",
        data: {
          id_prescription: id_prescription,
          // image: image,
          // date_medical: date_medical
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

const updatePrescription = async (req, res) => {
  try {
    const { id_prescription } = JSON.parse(req.body);
    const results = await checkPrescriptionExists(id_prescription);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay don thuoc ung voi ten",
        data: {
          id_prescription: id_prescription,
        },
      });
      return;
    }

    await pool.query(queries.updatePrescription, [id_prescription,id_prescription,]);
    res.status(200).json({
      results: "thanh cong",
      message: "don thuoc cap nhat thanh cong",
      data: {
        id_prescription: id_prescription,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deletePrescription = async (req, res) => {
  try {
    const { id_prescription } = JSON.parse(req.body);
    const results = await checkPrescriptionExists(id_prescription);
    console.log(results);
    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay don thuoc voi ten do",
        data: {
          id_prescription: id_prescription,
        },
      });
      return;
    }

    await pool.query(queries.deletePrescription, [id_prescription]);
    res.status(200).json({
      results: "thanh cong",
      message: "xoa don thuoc thanh cong",
      data: {
        id_prescription: id_prescription,
      },
    });
  } catch (error) {
    throw error;
  }
};
export default {
  getPrescription,
  getPrescriptionByIDPrescription,
  insertPrescription,
  updatePrescription,
  deletePrescription,
};
