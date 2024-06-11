const getClinic = "SELECT * FROM clinic;";
const Search_Province = "SELECT * FROM clinic WHERE province = $1;";
const Search_Province_City =
  "SELECT * FROM clinic WHERE province = $1 and city = $2";
const Search_Province_City_Adress =
  "SELECT * FROM clinic WHERE province = $1 and city = $2 and address = $3";

const insertClinic =
  "INSERT INTO clinic (id_clinic,name_clinic,name_doctor,province,city,address,status_clinic,lat,lng,ward) VALUES($1 , $2, $3, $4, $5, $6, $7, $8, $9,$10);";
const updateClinic = "UPDATE clinic SET name_clinic = $1 WHERE id_clinic = $2;";
const updateClinic_Status = "UPDATE clinic SET status_clinic = $1 where id_clinic = $2";
const deleteClinic = "DELETE FROM clinic WHERE id_clinic = $1;";
const findClinic = "SELECT * FROM clinic WHERE id_clinic = $1;";
const updateMultipleClinic = "UPDATE clinic SET name_clinic = $1,province = $2,city = $3,address = $4,status_clinic = $5,lat = $6,lng = $7 WHERE id_clinic = $8;"
export default {
  getClinic,
  Search_Province,
  Search_Province_City,
  Search_Province_City_Adress,
  insertClinic,
  updateClinic,
  updateClinic_Status,
  deleteClinic,
  findClinic,
  updateMultipleClinic
};
