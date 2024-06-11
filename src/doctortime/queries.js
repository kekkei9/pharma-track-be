const getDoctorAvailableShifts =
  "SELECT dt.shift FROM doctortime dt WHERE id_doctortime = $1 AND status = False;";
const bookDoctorShift =
  "UPDATE doctortime SET status = True WHERE id_doctortime = $1 AND shift = $2;";
const unbookDoctorShift =
  "UPDATE doctortime SET status = False WHERE id_doctortime = $1 AND shift = $2;";

export default {
  getDoctorAvailableShifts,
  bookDoctorShift,
  unbookDoctorShift,
};
