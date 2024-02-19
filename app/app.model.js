const db = require("./db");

function selectAllTopics(res, req) {
  db.query(`SELECT * FROM topics`).then((topic) => {
    return topic.rows
  });
}

module.exports = selectAllTopics;
