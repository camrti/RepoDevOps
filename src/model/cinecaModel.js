const mongoose = require('mongoose');

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

const Cineca = mongoose.model('Cineca', cinecaSchema);
module.exports = Cineca
