// Scopus functions

const axios = require('axios');
require('dotenv').config({ path: require('find-config')('.env') })

const apiKey = process.env.API_KEY_SCOPUS || '30aa24ac07654554de0733cc0dd6a789';


/**
 * REQs: [R3] - [HLD3.6]
 *       [R4] - [HLD4.6]
 * 
 * Retrieves the author ID from the Scopus Elsevier API based on the author's name, surname, and affiliation.
 *
 * @param {string} authorName - The name of the author.
 * @param {string} authorSurname - The surname of the author.
 * @param {string} affiliation - The affiliation of the author.
 * @returns {Promise<string>} A promise that resolves to the author ID.
 * @throws {Error} If there is an error retrieving the author ID.
 */
const getAuthorId = async (authorName, authorSurname, affiliation) => {
    const firstName = authorName
    const lastName = authorSurname
    const url = `https://api.elsevier.com/content/search/author?query=authlast(${lastName}) AND authfirst(${firstName}) AND affil(${affiliation})`;

    const headers = {
        'Accept': 'application/json',
        'X-ELS-APIKey': apiKey,
    };

    try {
        const response = await axios.get(url, { headers });
        const data = response.data;

        if (data['search-results'].entry) {
            const authorId = data['search-results'].entry[0]['dc:identifier'].split(':').pop();
            return authorId;
        } else {
            throw new Error('Author not found');
        }
    } catch (error) {
        console.error('Error retrieving author ID:', error.message);
        throw error;
    }
};


/**
 * REQs: [R3] - [HLD3.6]
 *       [R4] - [HLD4.6]
 * 
 * Retrieves author details from the Scopus Elsevier API based on the author ID.
 *
 * @param {string} authorId - The ID of the author.
 * @returns {Promise<Object>} A promise that resolves to an object containing author details.
 * @throws {Error} If there is an error retrieving author details.
 */
const getAuthorDetails = async (authorId) => {
    const url = `https://api.elsevier.com/content/author/author_id/${authorId}`;
    const headers = {
        'Accept': 'application/json',
        'X-ELS-APIKey': apiKey,
    };

    try {
        const response = await axios.get(url, { headers });
        const authorData = response.data['author-retrieval-response'][0];

        const preferredName = authorData['author-profile']['preferred-name'];
        const affiliation = authorData['author-profile']['affiliation-current']['affiliation']['ip-doc'];
        const documents = authorData['coredata'];

        const surname = (preferredName && preferredName['surname']) || undefined ;
        const name = (preferredName && preferredName['given-name']) || undefined;
        const uni_and_dep = (affiliation && affiliation['afdispname']) || undefined;
        const numberOfPublications = (documents && documents['document-count']) || undefined;

        return {
            surname,
            name,
            uni_and_dep,
            numberOfPublications,
            authorId
        };
    } catch (error) {
        console.error('Error retrieving author details:', error.message);
        throw error;
    }
};

// Export Scopus functions
module.exports = {
    getAuthorId,
    getAuthorDetails,
};