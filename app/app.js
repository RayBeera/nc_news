const express = require("express");
const {getAllTopics, getAllEndpoint} = require("./app.controller");

const app = express();

app.get("/api/topics", getAllTopics);

app.get("/api/", getAllEndpoint )

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
