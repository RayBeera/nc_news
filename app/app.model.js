const db = require("../db/connection.js");

function selectAllTopics(res, req) {
 return db.query(`SELECT * FROM topics`).then((topic) => {
    return topic.rows
  });
}

module.exports = selectAllTopics;
