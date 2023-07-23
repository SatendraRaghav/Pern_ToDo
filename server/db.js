const Pool = require("pg").Pool;
const pool = new Pool({
    user:"postgres",
    password:"act@1234",
    port:5433,
    database:"perntodo",
    idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});
module.exports = pool;