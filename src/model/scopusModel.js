const mongoose = require('mongoose');
const db = require('../database/connection').main;

const scopusSchema = new mongoose.Schema({
    uni_and_dep: {
        type: String
    },
    numberOfPublications: {
        type: String
    }
});

const Scopus = mongoose.model('Scopus', scopusSchema);
module.exports = Scopus