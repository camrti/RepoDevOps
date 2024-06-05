const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Define the list of researcher names
const researcherNames = ["Russo"];

// Define an array to store the results
let results = [];

async function fetchResearcherDetails(name) {
    const response = await axios.get(`http://172.16.174.108:8000/search_researchers?researcherName=${name}`);
    const $ = cheerio.load(response.data);
    let researchers = [];
    $('.list-group-item').each((i, el) => {
        let researcher = {};
        researcher.surname = $(el).find('strong:contains("Surname:")').get(0).nextSibling.nodeValue.trim().replace(/  +/g, ' ');
        researcher.name = $(el).find('strong:contains("Name:")').get(0).nextSibling.nodeValue.trim().replace(/  +/g, ' ');
        researcher.universityAndDepartment = $(el).find('strong:contains("University and Department:")').get(0).nextSibling.nodeValue.trim().replace(/  +/g, ' ');
        researcher.role = $(el).find('strong:contains("Role:")').get(0).nextSibling.nodeValue.trim().replace(/  +/g, ' ');
        researcher.ssd = $(el).find('strong:contains("S.S.D.:")').get(0).nextSibling.nodeValue.trim().replace(/  +/g, ' ');
        researchers.push(researcher);
    });
    return researchers;
}

async function fetchAll() {
    for (let name of researcherNames) {
        const researchers = await fetchResearcherDetails(name);
        results.push({
            researcherName: name,
            expectedResult: researchers
        });
    }
    fs.writeFileSync('researcher_test.json', JSON.stringify(results, null, 2));
}

fetchAll();