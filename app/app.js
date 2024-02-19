const express = require("express");
const getAllTopics = require("./app.controller");

const app = express();

app.get("/api/topics", getAllTopics);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
