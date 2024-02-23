const {insertPostComments, removeCommentById} = require("../models/comments.models");

function postComments(req, res, next) {
  const { article_id } = req.params;
  const newComment = req.body;
  insertPostComments(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteCommentByid(req, res, next) {
  const { comment_ids } = req.params;
  removeCommentById(comment_ids)
    .then(() => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { postComments, deleteCommentByid };
