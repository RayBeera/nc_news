const {
  selectAllTopics,
  selectAllEndpoint,
  selectArticleById,
  selectAllArticles,
  selectAllComments,
} = require("../models/topics.model");
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

function getAllComments(req, res, next) {
  const { article_id } = req.params;
  selectAllComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getAllTopics,
  getAllEndpoint,
  getAllComments,
};
