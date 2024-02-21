const express = require("express");
const {
  getAllTopics,
  getAllEndpoint,
  getAllCommentsById,
} = require("./controller/topics.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errorhandling");

const {
  getArticleById,
  getAllArticles,
} = require("./controller/articles.controller");

const app = express();

app.get("/api/topics", getAllTopics);

app.get("/api/", getAllEndpoint);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getAllCommentsById);



app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;