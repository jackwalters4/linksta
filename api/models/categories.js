const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },

    uid: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    }


})

const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories; 