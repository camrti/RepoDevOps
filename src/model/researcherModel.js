const mongoose = require('mongoose');
const db = require('../database/connection').main;

const researcherSchema = new mongoose.Schema({
    fascia: {
        type: String,
    },
    cognome : {
        type: String,
    },
    nome: {
        type: String,
    },
    genere: {
        type: String,
    },
    ateneo: {
        type: String,
    },
    facolta: {
        type: String,
    },
    ssd: {
        type: String,
    },
    sc: {
        type: String,
    },
    struttura: {
        type: String,
    },
    servizio_altro_ateneo: {
        type: String,
    },
    pubblicazioni: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
    }]
});

const Researcher = mongoose.model('Researcher', researcherSchema);
module.exports = Researcher