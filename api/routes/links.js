var express = require('express');
var router = express.Router();

const MongoClient = require("../mongodb");
const linksModel = require('../models/links');

/** Get all Links for a user */
router.get('/', async function(req, res, next) {

    const uid = req.query.uid;

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');
        const collection = mongo.db('linksta').collection('links');

        const linksDocuments = await collection.find({"uid" : uid}).toArray();
        console.log(linksDocuments);

        res.status(200);
        res.json(linksDocuments);
    } catch (err) {
        res.status(500);
        res.json({"err": err});
    } finally {
        mongo.close();
    }

});

/** Add a new link for a user */
router.post('/', async function(req, res, next) {

    const { uid, category_id, title, url, note } = req.body;

    const newLink = new linksModel({
        uid: uid,
        category_id: category_id,
        title: title,
        url: url,
        note: note
    });

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');
        const collection = mongo.db('linksta').collection('links');

        const res = await collection.insertOne(newLink);

        //res.acknowledged ?
        console.log(res);

        if (res.acknowledged) {
            res.status(200);
            res.json(res.insertedId);
        } else {
            res.status(500);
            res.json({"eeerr": "failed to inset"});
        }

    } catch (err) {
        res.status(500);
        res.json({"err": err});
    } finally {
        mongo.close();
    }


});

module.exports = router;