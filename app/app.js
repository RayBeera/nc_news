const express = require("express");
const {
  getAllTopics,
  getAllEndpoint,
  getArticleById,
  getAllArticles,
} = require("./app.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("../errorhandling");

const app = express();

app.get("/api/topics", getAllTopics);

app.get("/api/", getAllEndpoint);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;
