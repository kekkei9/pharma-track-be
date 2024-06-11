const getStaff = "SELECT * FROM staff;";
const insertStaff =
  "INSERT INTO staff (name, number, type, department, id_clinic) VALUES($1 , $2, $3, $4, $5);";
const updateStaffType = "UPDATE staff SET type = $1 WHERE name = $2;";
const deleteStaff = "DELETE FROM staff WHERE id_staff = $1;";
const getDoctorByName =
  "SELECT * FROM staff WHERE type = 'doctor' AND name = $1";
const getStaffByDepartment =
  "SELECT * FROM staff WHERE type = 'doctor' AND department = $1";
const getStaffByID = "SELECT * FROM staff WHERE id_staff = $1;";
const getStaffByClinicID = "SELECT * FROM staff WHERE id_clinic = $1;";
const findStaffID =
  "SELECT id_staff FROM staff WHERE name = $1 AND number = $2 AND id_clinic = $3 LIMIT 1;";
const insertDoctorTime =
  "INSERT INTO doctortime (id_doctortime, doctor, shift, status) VALUES($1, $2, $3, $4)";
const deleteDoctorTime = "DELETE FROM doctortime WHERE id_doctortime = $1";
export default {
  getStaff,
  insertStaff,
  updateStaffType,
  deleteStaff,
  deleteDoctorTime,
  getDoctorByName,
  getStaffByDepartment,
  getStaffByID,
  getStaffByClinicID,
  findStaffID,
  insertDoctorTime,
};
