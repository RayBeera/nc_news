const {
  selectAllTopics,
  selectAllEndpoint,
  selectArticleById,
} = require("./app.model");
const endpointsFile = require("../endpoints.json");

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
function getArticleById(req, res, next) {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getAllTopics, getAllEndpoint, getArticleById };
