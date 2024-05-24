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

// UNCOMMENT TO ADD SAMPLE TO DB
// async function addSampleToDB(){
//     let x = {
//         grade: '1',
//         lastName: 'Doe',
//         firstName: 'John',
//         gender: 'Male',
//         university: 'University of California, Berkeley',
//         faculty: 'Computer Science',
//         ssd: '1',
//         sc: '1',
//         structure: '1',
//         otherUniversityService: '1'
//     };
//     const r = await Researcher.create(x).catch((err) => { return reject(err); });
//     console.log(r);
// }
// addSampleToDB();