var express = require('express');
var router = express.Router();

const MongoClient = require('../mongodb');
const categoriesModel = require('../models/categories');

/** Get category from category id */
router.get('/', async function(req, res, next) {

    const id = req.query.id;

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');
        const collection = mongo.db('linksta').collection('categories');

        const category = await collection.findOne({"_id" : id});
        console.log(category);


        res.status(200);
        res.json(category);
    } catch (err) {
        res.status(500);
        res.json({"err": err});
    } finally {
        mongo.close();
    }

})

/** Get all categories for a user */
router.get('/user/', async function(req, res, next) {

    const uid = req.query.uid;

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');
        const collection = mongo.db('linksta').collection('categories');

        const categoryDocuments = collection.find({"uid" : uid});

        const categories = await categoryDocuments.toArray();

        res.status(200);
        res.json(categories);
    } catch (err) {
        res.status(500);
        res.json({"err": err});
    } finally {
        mongo.close();
    }

})

/** Create a new category for a user given uid */
router.post('/', async function(req, res, next) {

    const { uid, name } = req.body;

    const newCategory = new categoriesModel({
        uid: uid,
        name: name
    });

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');
        const collection = mongo.db('linksta').collection('categories');

        const response = await collection.insertOne(newCategory);

        //res.acknowledged ?
        console.log(response);

        if (response.acknowledged) {
            res.status(200);
            res.json(response);
        } else {
            res.status(500);
            res.json({"eeerr": "failed to inset"});
        }

    } catch (err) {
        res.status(500);
        console.log(err);
        res.json({"err": err});
    } finally {
        mongo.close();
    }

});

module.exports = router;