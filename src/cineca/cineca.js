// Cineca functions

const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Cleans and formats a field object into a string.
 *
 * @param {object} field - A field of a table.
 * @returns {string} - The cleaned and formatted string, or an empty string if the input is "Non disponibile".
 */
function cleanField(field) {
    let str = field.text().replace(/\s+/g, ' ').trim();
    if (str === 'Non disponibile') return "";
    return str.toUpperCase(); 
}

/**
 * Cleans and separates a field containing a name and surname.
 *
 * @param {object} field - The field object containing the text to clean and split.
 * @returns {object} An object containing the separated and cleaned name and surname in uppercase.
 * @returns {string} return.name - The cleaned and uppercase name.
 * @returns {string} return.surname - The cleaned and uppercase surname.
 */
function cleanNameSurnameField(field) {
    let name = "";
    let surname = "";
    let str = field.text().replace(/\s+/g, ' ').trim();

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toLowerCase() && str[i] !== str[i].toUpperCase()) {
            surname = str.slice(0, i-2);
            name = str.slice(i-1);
            break;
        }
    }        

    return {"name": name.toUpperCase(), "surname": surname.toUpperCase()};
};

/**
 * REQs: [R2] - [HLD2.2]
 * 
 * Fetches data of researchers from the Cineca website based on the provided name.
 *
 * @param {string} name - The name of the researcher to search for.
 * @returns {Promise<Array>} A promise that resolves to an array of researcher data objects or an empty array if an error occurs.
 */
async function getCinecaData(name) {
    const url = `https://cercauniversita.mur.gov.it/php5/docenti/vis_docenti.php?docinput=${encodeURIComponent(name)}&docsubmit=cerca`;

    try {
        // Make a GET request to the page
        const response = await axios.get(url);

        // Load HTML into Cheerio
        const $ = cheerio.load(response.data);

        // Find the table
        const table = $('table.risultati');

        // Extract data from the table
        let data = [];

        // Find the tbody of the table
        table.find('tbody').find('tr').each((index, row) => {
            // Ignore the table header
            if ($(row).find('th').length === 0) {
                const cells = $(row).find('td');
                let fullName = cleanNameSurnameField(cells.eq(1))
                data.push({
                    grade: cleanField(cells.eq(0)),
                    lastName: fullName.surname,
                    firstName: fullName.name,
                    gender: cleanField(cells.eq(2)),
                    university: cleanField(cells.eq(3)),
                    faculty: cleanField(cells.eq(4)),
                    ssd: cleanField(cells.eq(5)),
                    sc: cleanField(cells.eq(6)),
                    structure: cleanField(cells.eq(7)),
                    otherUniversityService: cleanField(cells.eq(8))
                });
            }
        });
        console.log('Data parsed from Cineca by Researcher');
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Export Cineca functions
module.exports = {
    getCinecaData
}; 