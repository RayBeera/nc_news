const selectAllTopics = require("./app.model");

const db = "../db";

function getAllTopics(req, res, next) {
    selectAllTopics().then((topics)=>{
        res.send(200).send({topics})
    })
}

module.exports = getAllTopics;
