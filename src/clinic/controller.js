import e, { query } from "express";
import pool from "../../db.js";
import queries from "./queries.js";

const checkClinicExists = async (id_clinic) => {
  try {
    const results = await pool.query(queries.findClinic, [id_clinic]);
    if (!results.rows.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const getClinic = async (req, res) => {
  try {
    const results = await pool.query(queries.getClinic);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getClinicByID_Clinic = async (req, res) => {
  try {
    const { id_clinic } = JSON.parse(req.body);
    const result = await pool.query(queries.findClinic, [id_clinic]);
    if (!result.rows.length) {
      res.status(404).json({
        result: "that bai",
        reason: `phong kham voi id ${id_clinic} khong tim thay`,
      });
    } else {
      res.status(200).json(result.rows);
    }
  } catch (error) {
    throw error;
  }
};

const Search_TinhThanhPho = async (req, res) => {
  try {
    const { province } = JSON.parse(req.body);
    const results = await pool.query(queries.Search_Province, [province]);
    if (!results.rows.length) {
      res.status(404).json({
        result: "that bai",
        reason: `khong co phong kham voi ten ${province} trong database`,
      });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (error) {
    throw error;
  }
};

const Search_TinhThanhPho_QuanHuyen = async (req, res) => {
  try {
    const { province, city } = JSON.parse(req.body);
    const results = await pool.query(queries.Search_Province_City, [
      province,
      city,
    ]);
    if (!results.rows.length) {
      res.status(404).json({
        result: "that bai",
        reason: `Khong ton tai phong kham o tinh/thanhpho: ${province} va quan/huyen: ${city} trong database`,
      });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (error) {
    throw error;
  }
};

const Search_TinhThanhPho_QuanHuyen_DiaChi = async (req, res) => {
  try {
    const { province, city, address } = JSON.parse(req.body);
    const results = await pool.query(queries.Search_Province_City_Adress, [
      province,
      city,
      address,
    ]);
    if (!results.rows.length) {
      res.status(404).json({
        result: "that bai",
        reason: `Khong ton tai phong kham o province ${province} va city ${city} va dia chi = ${address} trong database`,
      });
    } else {
      res.status(200).json(results.rows);
    }
  } catch (error) {
    throw error;
  }
};

const insertClinic = async (req, res) => {
  try {
    const {
      id_clinic,
      name_clinic,
      name_doctor,
      province,
      city,
      address,
      status_clinic,
      lat,
      lng,
      ward
    } = JSON.parse(req.body);
    const checkexists = await checkClinicExists(id_clinic);
    if (checkexists === false) {
      await pool.query(queries.insertClinic, [
        id_clinic,
        name_clinic,
        name_doctor,
        province,
        city,
        address,
        status_clinic,
        lat,
        lng,
        ward
      ]);
      res.status(200).json({
        results: "thanh cong",
        message: "them clinic thanh cong",
        data: {
          id_clinic: id_clinic,
          name_clinic: name_clinic,
          name_doctor: name_doctor,
          province: province,
          city: city,
          address: address,
          status_clinic: status_clinic,
          lat: lat,
          lng: lng,
          ward:ward
        },
      });
    } else {
      res.status(404).json({
        results: "that bai",
        message: "clinic voi id nay da ton tai",
        data: {
          id_clinic: id_clinic,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

const updateMultipleClinic = async(req,res) => {
  try {
    const {name_clinic,province,city,address,status_clinic,lat,lng,id_clinic} = JSON.parse(req.body);
    const results = await checkClinicExists(id_clinic);
    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay phong kham voi ten",
        data: {
          id_clinic: id_clinic,
        },
      });
      return;
    }
    await pool.query(queries.updateMultipleClinic,[name_clinic,province,city,address,status_clinic,lat,lng,id_clinic]);
    res.status(200).json({
      results: "thanh cong",
      message: "phong kham cap nhat thanh cong",
      data: {
        name_clinic: name_clinic,
        province:province,
        city:city,
        address:address,
        status_clinic:status_clinic,
        lat:lat,
        lng:lng,
        id_clinic: id_clinic,
      },
    });
  } catch (error) {
    throw error;
  }
}

const updateClinic = async (req, res) => {    // update theo ten clinic
  try {
    const { name_clinic, id_clinic } = JSON.parse(req.body);
    const results = await checkClinicExists(id_clinic);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay phong kham voi ten",
        data: {
          name_clinic: name_clinic,
        },
      });
      return;
    }

    await pool.query(queries.updateClinic, [name_clinic, id_clinic]);
    res.status(200).json({
      results: "thanh cong",
      message: "phong kham cap nhat thanh cong",
      data: {
        name_clinic: name_clinic,
        id_clinic: id_clinic,
      },
    });
  } catch (error) {
    throw error;
  }
};

const updateClinicStatus = async(req,res) => {      // update trang thai clinic
  try {
    const { status_clinic, id_clinic } = JSON.parse(req.body);
    const results = await checkClinicExists(id_clinic);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay phong kham voi ten",
        data: {
          name_clinic: name_clinic,
        },
      });
      return;
    }

    await pool.query(queries.updateClinic, [status_clinic, id_clinic]);
    res.status(200).json({
      results: "thanh cong",
      message: "phong kham cap nhat thanh cong",
      data: {
        status_clinic:status_clinic,
        id_clinic: id_clinic,
      },
    });
  } catch (error) {
    throw error;
  } try {
    const { name_clinic, id_clinic } = JSON.parse(req.body);
    const results = await checkClinicExists(id_clinic);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay phong kham voi ten",
        data: {
          name_clinic: name_clinic,
        },
      });
      return;
    }

    await pool.query(queries.updateClinic, [name_clinic, id_clinic]);
    res.status(200).json({
      results: "thanh cong",
      message: "phong kham cap nhat thanh cong",
      data: {
        name_clinic: name_clinic,
        id_clinic: id_clinic,
      },
    });
  } catch (error) {
    throw error;
  }
}

const updateClinicByAttribute = async(req,res) => {
  try {
    const {Attribute,content,id_clinic} = JSON.parse(req.body);
    const result = checkClinicExists(id_clinic);
    if(!result)
    {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay phong kham voi id o duoi",
        data: {
          id_clinic: id_clinic
        },
      });
      return;
    }
    else
    {
      await pool.query(`UPDATE clinic SET ${Attribute} = $1 WHERE id_clinic = $2`,[content,id_clinic]);
      res.status(200).json({
        mesage: "Update successfullt",
        data: {
          id_clinic:id_clinic,
          Attribute:content
        }
      })
    }
  } catch (error) {
    throw error;
  }
}

const deleteClinic = async (req, res) => {
  try {
    const { id_clinic } = JSON.parse(req.body);
    const results = await checkClinicExists(id_clinic);

    if (!results) {
      res.status(404).json({
        results: "that bai",
        message: "khong tim thay phong kham voi id o duoi",
        data: {
          id_clinic: id_clinic,
        },
      });
      return;
    }

    await pool.query(queries.deleteClinic, [id_clinic]);
    res.status(200).json({
      results: "thanh cong",
      message: "xoa phong kham thanh cong",
      data: {
        id_clinic: id_clinic,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getClinic,
  getClinicByID_Clinic,
  Search_TinhThanhPho,
  Search_TinhThanhPho_QuanHuyen,
  Search_TinhThanhPho_QuanHuyen_DiaChi,
  insertClinic,
  updateClinic,
  updateClinicStatus,
  updateClinicByAttribute,
  deleteClinic,
  updateMultipleClinic
};
