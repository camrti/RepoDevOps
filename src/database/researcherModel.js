const mongoose = require('mongoose');
const db = require('../conn').main;

const researcherSchema = new mongoose.Schema({
    fascia: {
        type: String,
        required: true
    },
    cognome_nome: {
        type: String,
        required: true
    },
    genere: {
        type: String,
        required: true
    },
    ateneo: {
        type: String,
        required: true
    },
    facolta: {
        type: String,
        required: true
    },
    ssd: {
        type: String,
        required: true
    },
    sc: {
        type: String,
        required: true
    },
    struttura: {
        type: String,
        required: true
    },
    servizio_altro_ateneo: {
        type: String,
        required: true
    }
});

const Researcher = mongoose.model('Researcher', researcherSchema);
module.exports = Researcher