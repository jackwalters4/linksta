var express = require('express');
var router = express.Router();

var MongoClient = require("../mongodb");

/** Get all Links for a user */
router.get('/', async function(req, res, next) {

    const uid = req.query.uid;

    const mongo = MongoClient();

    try {
        await mongo.connect();
        const collection = mongo.db('linksta').collection('links');

        const linksDocuments = await collection.find({"uid" : uid}).toArray();
        console.log(linksDocuments);

        res.status(200);
        res.json(linksDocuments);
    } catch (err) {
        res.status(500);
        res.json({"err": err});
    }

  });

  module.exports = router;