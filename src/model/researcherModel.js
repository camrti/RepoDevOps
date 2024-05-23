const mongoose = require('mongoose');
const db = require('../database/connection').main;

const researcherSchema = new mongoose.Schema({
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
    publications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
    }]
});

const Researcher = mongoose.model('Researcher', researcherSchema);
module.exports = Researcher