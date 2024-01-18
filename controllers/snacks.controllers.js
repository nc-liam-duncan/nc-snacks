const {
  fetchSnacks,
  fetchSnackBySnackId,
  addSnack
} = require("../models/snacks.models");
const { checkCategoryExists } = require("../utils/check-exists");

const getSnacks = (req, res, next) => {
  const { sort_by, category } = req.query;

  const fetchSnacksQuery = fetchSnacks(sort_by, category);
  const queries = [fetchSnacksQuery];

  if (category) {
    const categoryExistenceQuery = checkCategoryExists(category);
    queries.push(categoryExistenceQuery);
  }

  Promise.all(queries)
    .then((response) => {
      const snacks = response[0];
      res.status(200).send({ snacks });
    })
    .catch((err) => {
      next(err);
    });
};

const getSnackBySnackId = (req, res, next) => {
  const { snack_id } = req.params;
  fetchSnackBySnackId(snack_id)
    .then((snack) => {
      res.status(200).send({ snack });
    })
    .catch((err) => {
      next(err);
    });
};

const postSnack = (req, res) => {
  const newSnack = req.body;
  addSnack(newSnack).then(() => {
    res.status(201).send({ newSnack });
  });
};

module.exports = { getSnacks, getSnackBySnackId, postSnack };
