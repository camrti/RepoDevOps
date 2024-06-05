const mongoose = require('mongoose');

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


const Scholar = mongoose.model('Scholar', scholarSchema);
module.exports = Scholar