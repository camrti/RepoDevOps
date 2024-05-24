const mongoose = require('mongoose');
const db = require('../database/connection').main;

const publicationSchema = new mongoose.Schema({
    title: {
        type: String
    },
    authors: [{
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Researcher'
        }
    }],
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
});

const Publication = mongoose.model('Publication', PublicationSchema);
module.exports = Publication