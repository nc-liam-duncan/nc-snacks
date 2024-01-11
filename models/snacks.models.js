const fs = require("fs/promises");
const db = require("../db/connection");

const fetchSnacks = () => {
  return db.query(`SELECT * FROM snacks`).then(({ rows }) => {
    return rows;
  });
};

const fetchSnackBySnackId = (id) => {
  return db
    .query(`SELECT * FROM snacks WHERE snack_id=$1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Id not found" });
      }
      return rows[0];
    });
};

const addSnack = (newSnack) => {
  const { snack_name, snack_description, price_in_pence, category_id } =
    newSnack;

  return db
    .query(
      `INSERT INTO snacks (snack_name, snack_description, price_in_pence, category_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [snack_name, snack_description, price_in_pence, category_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = { fetchSnacks, fetchSnackBySnackId, addSnack };
