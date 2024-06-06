const mongoose = require('mongoose');

const scopusSchema = new mongoose.Schema({
    surname: {
        type: String
    },
    name: {
        type: String
    },
    uni_and_dep: {
        type: String
    },
    numberOfPublications: {
        type: String
    },
    authorId: {
        type: String
    }
});

const Scopus = mongoose.model('Scopus', scopusSchema);
module.exports = Scopus