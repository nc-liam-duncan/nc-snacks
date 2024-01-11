const {
  fetchSnacks,
  fetchSnackBySnackId,
  addSnack
} = require("../models/snacks.models");

const getSnacks = (request, response, next) => {
  fetchSnacks()
    .then((snacks) => {
      response.status(200).send({ snacks });
    })
    .catch((err) => {
      next(err);
    });
};
const getSnackBySnackId = (request, response, next) => {
  const { snack_id } = request.params;
  fetchSnackBySnackId(snack_id)
    .then((snack) => {
      response.status(200).send({ snack });
    })
    .catch((err) => {
      next(err);
    });
};

const postSnack = (request, response) => {
  const newSnack = request.body;
  addSnack(newSnack).then(() => {
    response.status(201).send({ newSnack });
  });
};

module.exports = { getSnacks, getSnackBySnackId, postSnack };
