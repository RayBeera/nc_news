const db = require("../db/connection.js");


// function checkUserExists () => {

// }

function insertPostComments(article_id, createComment) {
  const { username, body } = createComment;
  if (createComment.body === ""){
  return Promise.reject({
    status: 400,
    msg: "Bad request",
  });} 
  
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
        })
      }
      return comment.rows[0];
    });

}

module.exports = insertPostComments;
