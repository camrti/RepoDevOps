// Cineca Model

const mongoose = require('mongoose');

/**
 * Defines the schema for the Cineca collection in the MongoDB database.
 */
const cinecaSchema = new mongoose.Schema({
    grade: {
        type: String,
    },
    lastName: {
        type: String,
    },
    firstName: {
        type: String,
    },
    gender: {
        type: String,
    },
    university: {
        type: String,
    },
    faculty: {
        type: String,
    },
    ssd: {
        type: String,
    },
    sc: {
        type: String,
    },
    structure: {
        type: String,
    },
    otherUniversityService: {
        type: String,
    },
    scholarID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scholar',
    }],
    scopusID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scopus',
    }]
});

// Represents the Cineca model in the MongoDB database.
const Cineca = mongoose.model('Cineca', cinecaSchema);

// Export the Cineca model
module.exports = Cineca
