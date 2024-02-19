const { selectAllTopics, selectAllEndpoint } = require("./app.model");
const endpoints = require("../endpoints.json");

const db = "../db";

function getAllTopics(req, res, next) {
  selectAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
}

function getAllEndpoint(req, res, next) {
  selectAllEndpoint()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getAllTopics, getAllEndpoint };
