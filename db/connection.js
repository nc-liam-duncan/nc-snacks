const { Pool } = require("pg");

// use dotenv to either look for the test DB, or the development DB
// this will be determined by the value of NODE_ENV
const ENV = process.env.NODE_ENV || "development";

const pathToEnvFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({
  path: pathToEnvFile
});

const pool = new Pool();

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

console.log(process.env.PGDATABASE);

module.exports = pool;
