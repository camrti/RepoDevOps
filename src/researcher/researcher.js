const axios = require('axios');
const cheerio = require('cheerio');

function cleanField(field) {
    let str = field.text().replace(/\s+/g, ' ').trim();
    return str.toUpperCase(); 
}

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
                    fascia: cleanField(cells.eq(0)),
                    cognome: fullName.surname,
                    nome: fullName.name,
                    genere: cleanField(cells.eq(2)),
                    ateneo: cleanField(cells.eq(3)),
                    facolta: cleanField(cells.eq(4)),
                    ssd: cleanField(cells.eq(5)),
                    sc: cleanField(cells.eq(6)),
                    struttura: cleanField(cells.eq(7)),
                    servizio_altro_ateneo: cleanField(cells.eq(8))
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
module.exports = {
    getCinecaData
}; 