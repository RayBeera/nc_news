const db = require("../db/connection.js");
const fs = require("fs/promises");

function selectAllTopics(res, req) {
  return db.query(`SELECT * FROM topics`).then((topic) => {
    return topic.rows;
  });
}

function selectAllEndpoint() {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((data) => {
    console.log(data)
    const endpoints = JSON.parse(data);
    return endpoints;
  });
}
module.exports = {selectAllTopics, selectAllEndpoint};
