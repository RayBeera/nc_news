const db = require("../db/connection.js");

function selectAllUsers() {
  return db.query(`SELECT * FROM users`).then((user) => {
    return user.rows;
  });
}

module.exports = selectAllUsers;
