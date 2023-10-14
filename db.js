const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  port: 5432,
  password: "admin",
  database: "movies",
});

module.exports = pool;
