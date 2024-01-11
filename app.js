const express = require("express");
const app = express();
const {
  getSnacks,
  getSnackBySnackId,
  postSnack
} = require("./controllers/snacks.controllers");
const {
  getVendingMachines,
  getVendingMachineById
} = require("./controllers/vending-machines.controllers");
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler
} = require("./error-handlers");

app.use(express.json());

app.get("/api", (request, response) => {
  response.status(200).send({ message: "Hello world!" });
});

app.get("/api/snacks", getSnacks);

app.get("/api/snacks/:snack_id", getSnackBySnackId);

app.post("/api/snacks", postSnack);

app.get("/api/venders", getVendingMachines);

app.get("/api/venders/:venderId", getVendingMachineById);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
