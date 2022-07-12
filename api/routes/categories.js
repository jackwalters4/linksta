var express = require('express');
var router = express.Router();

const MongoClient = require('../mongodb');
const categoriesModel = require('../models/categories');

/** Create a new category for a user given uid */
router.post('/', async function(req, res, next) {

    const { id, uid, name } = req.body;

    const newCategory = new categoriesModel({
        _id: id,
        uid: uid,
        name: name
    });

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');
        const collection = mongo.db('linksta').collection('categories');

        const res = await collection.insertOne(newCategory);

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