// Scholar Model

const mongoose = require('mongoose');

/**
 * Defines the schema for the Scholar collection in the MongoDB database.
 */
const scholarSchema = new mongoose.Schema({
    hIndex: {
        type: String
    },
    citations: {
        type: String
    },
    publications: [
        {
            title: {
                type: String
            },
            authors: {
                type: String
            },
            paperType: {
                type: String
            },
            year: {
                type: String
            },
            citationCount: {
                type: Number
            },
            publicationLink: {
                type: String
            }
        }
    ]
});

// Represents the Scholar model in the MongoDB database.
const Scholar = mongoose.model('Scholar', scholarSchema);

// Export the Scholar model
module.exports = Scholar