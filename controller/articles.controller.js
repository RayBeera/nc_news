const {
  selectArticleById,
  selectAllArticles,
  insertUpdatedArticle,
} = require("../models/articles.model");

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

function getAllArticles(req, res, next) {
  selectAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function updateArticle(req, res, next) {
  const { article_id } = req.params;

  const { inc_votes } = req.body;
  // if (inc_votes === undefined || inc_votes === 0) {

  Promise.all([
    selectArticleById(article_id),
    insertUpdatedArticle(article_id, inc_votes),
  ])
    .then((article) => {
      res.status(200).send({ article: article[1] });
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = {
  getArticleById,
  getAllArticles,
  updateArticle,
};
