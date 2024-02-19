const db = require("../db/connection.js");
const fs = require("fs/promises");

function selectAllTopics(res, req) {
  return db.query(`SELECT * FROM topics`).then((topic) => {
    return topic.rows;
  });
}

function selectAllEndpoint() {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((data) => {
    const endpoints = JSON.parse(data);
    return endpoints;
  });
}

function selectArticleById(articleId) {
  return db
    .query(
      `
  SELECT *
  FROM articles
  WHERE article_id = $1`,
      [articleId]
    )
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "article not found",
        });
      }
      return article.rows[0];
    });
}
module.exports = { selectAllTopics, selectAllEndpoint, selectArticleById };
