const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();

/**
 * Creates a MongoClient based off connection URL of my MongoDB cluster
 * MongoClient used whenever grabbing mongo stuff
 * @returns MongoClient
 */

const initializeMongoClient = () => {

    const uri = process.env.MONGO_URL;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    return client;

};

module.exports = initializeMongoClient;