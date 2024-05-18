const axios = require('axios');
const cheerio = require('cheerio');

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
        const data = [];
        table.find('tr').each((index, row) => {
            // Ignore the table header
            if ($(row).find('th').length === 0) {
                const cells = $(row).find('td');
                data.push({
                    fascia: cells.eq(0).text().trim(),
                    cognome_nome: cells.eq(1).text().trim(),
                    genere: cells.eq(2).text().trim(),
                    ateneo: cells.eq(3).text().trim(),
                    facolta: cells.eq(4).text().trim(),
                    ssd: cells.eq(5).text().trim(),
                    sc: cells.eq(6).text().trim(),
                    struttura: cells.eq(7).text().trim(),
                    servizio_altro_ateneo: cells.eq(8).text().trim()
                });
            }
        });
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
module.exports = {
    getCinecaData
}; 
