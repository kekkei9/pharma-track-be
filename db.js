import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "pharma_track_user",
  host: "dpg-cpk6g9uct0pc73b38hog-a",
  database: "pharma_track",
  password: "HvasiouShKxZAfSoQiHOTIJI1ZLiXmBu",
  port: 5432,
});

export default pool;
