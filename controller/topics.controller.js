const {
  selectAllTopics,
  selectAllEndpoint,
  selectCommentsById,
} = require("../models/topics.model");
const endpointsFile = require("../endpoints.json");
const { selectArticleById } = require("../models/articles.model");
const { response } = require("../app");

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

function getAllCommentsById(req, res, next) {
  const { article_id } = req.params;
  const promises = [selectCommentsById(article_id)];

  if (article_id) {
    promises.push(selectArticleById(article_id));
  }

  Promise.all(promises)
    .then((result) => {
      res.status(200).send({ comments: result[0] });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getAllTopics,
  getAllEndpoint,
  getAllCommentsById,
};
