var express = require('express');
var router = express.Router();

const MongoClient = require("../mongodb");
const linksModel = require('../models/links');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

/** Get all Links for a user */
router.get('/', async function(req, res, next) {

    const uid = req.query.uid;

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');
        const catCollection = mongo.db('linksta').collection('categories');
        const linkCollection = mongo.db('linksta').collection('links');

        // so get categories of a user first theen retrieve all links from each category and structure likee below
        // will also save a lot of time on frontend I think ?
        
        // Shape of Category Map:
        /**
          [
            {
                category: {id: "", name: "", ...},
                links: [{}, {}, {}]
            },

            {
                category: {id: "", name: "", ...,
                links: [{}, {}, {}]
            },

            {
                category: {id: "", name: "", ...,
                links: [{}, {}, {}]
            }
           ]

         */

        
        // get user's categories
        const catDocuments = await catCollection.find({"uid" : uid}).toArray();
       
        // for each category, grab all the links that belong to it and structure it in shape shown above
        const categoryMap = await Promise.all(catDocuments.map(async (cat) => {
            const linksDocuments = await linkCollection.find({"category_id": cat._id}).toArray();
            return {
                category: cat,
                links: linksDocuments
            }
        }));

        res.status(200);
        res.json(categoryMap);
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

/** Deletee link */
router.delete('/', async function(req, res, next) {
    
    const link_id = req.query.link_id;

    const mongo = MongoClient();

    try {
        await mongo.connect();
        console.log('connected');

        const collection = mongo.db('linksta').collection('links');

        const result = await collection.deleteOne({_id: ObjectId(link_id)});

        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
            res.status(200);
            res.json({'greeat':'success'});
          } else {
            console.log("No documents matched the query. Deleted 0 documents.");
            res.status(500);
            res.json({'not great': 'success'});
          }

    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({"err": err});
    } finally {
        mongo.close();
    }
    
})

module.exports = router;