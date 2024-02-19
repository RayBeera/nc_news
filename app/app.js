const express = require("express");
const {
  getAllTopics,
  getAllEndpoint,
  getArticleById,
} = require("./app.controller");

const app = express();

app.get("/api/topics", getAllTopics);

app.get("/api/", getAllEndpoint);

app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
