// Scopus Model

const mongoose = require('mongoose');

/**
 * Defines the schema for the Scopus collection in the MongoDB database.
 */
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

// Represents the Scopus model in the MongoDB database.
const Scopus = mongoose.model('Scopus', scopusSchema);

// Export the Scopus model
module.exports = Scopus