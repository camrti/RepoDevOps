const mongoose = require('mongoose');

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