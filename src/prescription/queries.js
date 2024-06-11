const getPrescription = "SELECT * FROM prescription order by id_prescription asc;";
// const getPrescriptionByDateMedical = "SELECT* FROM prescription where date_medical = $1;"
const insertPrescription =
  "INSERT INTO prescription (id_prescription) VALUES($1);";
const updatePrescription = "UPDATE prescription SET id_prescription = $1 WHERE id_prescription = $2;";
const deletePrescription = "DELETE FROM prescription WHERE id_prescription = $1;";
const findPrescription = "SELECT * FROM prescription WHERE id_prescription = $1;";
export default {
  getPrescription,
  insertPrescription,
  updatePrescription,
  deletePrescription,
  findPrescription,
};
