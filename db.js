import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "pharma_track_user",
  host: "dpg-cec8smpgp3jg4tel6c90-a",
  database: "pharma_track",
  password: "mOWVNDwa4VoDk2q5mW6OYv76l1Ki1t8P",
  port: 5432,
});

export default pool;
