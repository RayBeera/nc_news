const db = require("../db/connection.js");

function insertPostComments(article_id, createComment) {
  const { username, body } = createComment;
  return db
    .query(
      `INSERT INTO comments (body, author, article_id)
    VALUES ($1, $2, $3)
    RETURNING *;`,
      [body, username, article_id ]
    )
    .then((comment) => {
      return comment.rows[0];
    });
}

module.exports = insertPostComments;
