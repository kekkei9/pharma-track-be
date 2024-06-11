const getAppointment = "SELECT * FROM appointment;";
const insertAppointment =
  "INSERT INTO appointment (time, doctor, test, number, address, status, id_clinic, id_user, id_staff) VALUES($1 , $2, $3, $4, $5, $6, $7, $8, $9);";
const updateAppointmentStatus =
  "UPDATE appointment SET status = $1 WHERE id_appointment = $2;";
const deleteAppointment = "DELETE FROM appointment WHERE id_appointment = $1;";
const findAppointmentWithID =
  "SELECT * FROM appointment WHERE id_appointment = $1;";
const findAppointmentID =
  "SELECT id_appointment FROM appointment WHERE time = $1 AND doctor = $2 AND id_clinic = $3 AND id_staff = $4 LIMIT 1;";
const getAppointmentWithIdUser =
  "SELECT * FROM appointment WHERE id_user = $1;";
const getAppointmentByIdClinic =
  "SELECT * FROM appointment WHERE id_clinic = $1";
const getAppointmentByIdStaff = "SELECT * FROM appointment WHERE id_staff = $1";
const getAppointmentByIdAppointment =
  "SELECT * FROM appointment WHERE id_appointment = $1";
export default {
  getAppointment,
  getAppointmentWithIdUser,
  insertAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  findAppointmentWithID,
  findAppointmentID,
  getAppointmentByIdClinic,
  getAppointmentByIdStaff,
  getAppointmentByIdAppointment,
};
