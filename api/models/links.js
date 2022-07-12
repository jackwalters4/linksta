const mongoose = require('mongoose');

const linksSchema = new mongoose.Schema({

    uid: {
        type: String,
        required: true,
    },

    category_id: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        required: true,
    },

    note: {
        type: String,
        required: true,
    },


})

const Links = mongoose.model('Links', linksSchema);
module.exports = Links; 