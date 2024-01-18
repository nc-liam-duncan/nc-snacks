const db = require("../db/connection");

exports.checkCategoryExists = (category) => {
  return db
    .query("SELECT * FROM categories WHERE category_name = $1", [category])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "category not found" });
      }
      // else? I don't care - do NOTHING
    });
};
