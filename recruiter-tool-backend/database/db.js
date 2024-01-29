const { Pool } = require("pg");

const pool = new Pool({
  user: "ubqbcvpm",
  host: "kashin.db.elephantsql.com",
  database: "ubqbcvpm",
  password: "DpYMOR4_ssQ94ZPUcRzRE9afAGTGwhxG",
  port: 5432,
});

module.exports = pool;
