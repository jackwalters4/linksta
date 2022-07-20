var express = require('express');
var router = express.Router();

const MongoClient = require("../mongodb");
const linksModel = require('../models/links');
const _ = require('lodash');

/** Get all Links for a user */
router.get('/', async function(req, res, next) {

    const uid = req.query.uid;

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');
        const collection = mongo.db('linksta').collection('links');

        // get all of the links for this user
        const linksDocuments = await collection.find({"uid" : uid}).toArray();

        // group the links by collection id
        const groupedLinks = _.groupBy(linksDocuments, "category_id");

        // format the groupedLinks in array of form:
        /**
          [
            {
                category_id: “”,
                links: [“”, “”, “”]
            },

            {
                category_id: “”,
                links: [“”, “”, “”]
            },

            {
                category_id: “”,
                links: [“”, “”, “”]
            }
           ]
         */

        const result= []
        for (const [key, value] of Object.entries(groupedLinks)) {

            result.push({
              category_id: key,
              links: value
            })
            
        }

        res.status(200);
        res.json(result);
    } catch (err) {
        console.log(err);
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

        const response = await collection.insertOne(newLink);

        console.log(response);

        if (response.acknowledged) {
            res.status(200);
            res.json({"great":"success"});
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