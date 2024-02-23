const db = require("../db/connection.js");

function insertPostComments(article_id, createComment) {
  const { username, body } = createComment;
  if (createComment.body === "") {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }

  return db
    .query(
      `INSERT INTO comments (body, author, article_id)
    VALUES ($1, $2, $3)
    RETURNING *;`,
      [body, username, article_id]
    )
    .then((comment) => {
      if (comment.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "article not found",
        });
      }
      return comment.rows[0];
    });
}
function removeCommentById(comment_ids) {
  return db
    .query(
      `
      DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *`,
      [comment_ids]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "comment not found",
        });
      }
    });
}
module.exports = { insertPostComments, removeCommentById };
