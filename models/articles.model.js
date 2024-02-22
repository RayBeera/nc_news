const db = require("../db/connection.js");
const fs = require("fs/promises");

function selectArticleById(article_id) {
  return db
    .query(
      `
    SELECT *
    FROM articles
    WHERE article_id = $1`,
      [article_id]
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

function selectAllArticles() {
  return db
    .query(
      `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url,
    COUNT (comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`
    )
    .then((article) => {
      return article.rows;
    });
}
module.exports = {
   
    selectArticleById,
    selectAllArticles,

  };