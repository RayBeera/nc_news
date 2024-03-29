const db = require("../db/connection.js");
const fs = require("fs/promises");

let queryString = `SELECT *
FROM articles
WHERE article_id = $1`;
function selectArticleById(article_id) {
  return db.query(queryString, [article_id]).then((article) => {
    if (article.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "article not found",
      });
    }
    return article.rows[0];
  });
}

function selectAllArticles(topic) {

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

function insertUpdatedArticle(article_id, inc_votes) {
  
  return db
    .query(
      `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "article not found",
        });
      }
      return result.rows[0];
    })
}

module.exports = {
  selectArticleById,
  selectAllArticles,
  insertUpdatedArticle,
};
