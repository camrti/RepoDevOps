const axios = require('axios');
const cheerio = require('cheerio');

function cleanString(value, isName=false, isSurname=false ) {
    str = value.text()

    if (isSurname)
        str = str.split(" ")[0];
    if (isName)
        str = str.split(" ")[1];

    str = str.replace(/\s+/g, ' ').trim().toLowerCase();

    return str;
}

async function getCinecaData(name) {
    const url = 
`https://cercauniversita.mur.gov.it/php5/docenti/vis_docenti.php?docinput=${encodeURIComponent(name)}&docsubmit=cerca`;

    try {
        // Make a GET request to the page
        const response = await axios.get(url);

        // Load HTML into Cheerio
        const $ = cheerio.load(response.data);

        // Find the table
        const table = $('table.risultati');

        // Extract data from the table
        let data = {};

        table.find('tr').each((index, row) => {
            // Ignore the table header
            if ($(row).find('th').length === 0) {
                const cells = $(row).find('td');
                data ={
                    fascia: cleanString(cells.eq(0)),
                    cognome: cleanString(cells.eq(1),isSurname=true),
                    nome: cleanString(cells.eq(1), isName=true),
                    genere: cleanString(cells.eq(2)),
                    ateneo: cleanString(cells.eq(3)),
                    facolta: cleanString(cells.eq(4)),
                    ssd: cleanString(cells.eq(5)),
                    sc: cleanString(cells.eq(6)),
                    struttura: cleanString(cells.eq(7)),
                    servizio_altro_ateneo: cleanString(cells.eq(8))
                };
            }
        });
        console.log('Data parsed from Cineca by Researcher');
        return data;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}
module.exports = {
    getCinecaData
}; 

getCinecaData("Francesco_Moscato")