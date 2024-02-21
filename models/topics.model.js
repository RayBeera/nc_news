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

function selectCommentsById(article_id) {
  return db
    .query(
      ` SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC`,
      [article_id]
    )
    .then((comment) => {
      return comment.rows;
    });
}

module.exports = {
  selectAllTopics,
  selectAllEndpoint,
  selectCommentsById,
};
