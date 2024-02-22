const insertPostComments = require("../models/comments.models");

function postComments(req, res, next) {
  const { article_id } = req.params;
  const newComment = req.body;
  insertPostComments(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment});
    })
    .catch((err) => {
        console.log(err)
      next(err);
    });
}

module.exports = { postComments };
