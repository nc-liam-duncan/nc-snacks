const db = require("../db/connection");

const fetchSnacks = (sort_by = "snack_name", category) => {
  const validSortQueries = ["snack_name", "price_in_pence"];
  if (!validSortQueries.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "invalid sort_by query" });
  }
  let queryStr = `
    SELECT snacks.*, category_name FROM snacks
    JOIN categories ON categories.category_id = snacks.category_id
  `;
  const queryParameters = [];
  if (category) {
    queryStr += " WHERE category_name = $1";
    queryParameters.push(category);
  }
  queryStr += ` ORDER BY ${sort_by};`;
  return db.query(queryStr, queryParameters).then(({ rows }) => {
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
