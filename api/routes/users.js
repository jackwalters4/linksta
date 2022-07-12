var express = require('express');
var router = express.Router();

var mongoClient = require("../mongodb");

/* GET user via uid */
router.get('/', async function(req, res, next) {

  const uid = req.query.uid;

  const mongo = mongoClient();

  try {

    await mongo.connect();
    console.log('connected');

    // existing user is "62ccc3518f2bb12d96456479"

    const collection = mongo.db('linksta').collection('users');
    const user = await collection.findOne({"_id" : uid});
    console.log(user);


    res.status(200);
    res.json(user);
  } catch (err) {
    console.log('failed to connect');
    res.status(500);
    res.json({"err": err});
  } finally {
    mongo.close();
}

});

module.exports = router;
