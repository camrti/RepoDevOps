const axios = require('axios');
require('dotenv').config({ path: require('find-config')('.env') })

const apiKey = process.env.API_KEY_SCOPUS;

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
            console.log('Author ID:', authorId);
            return authorId;
        } else {
            throw new Error('Author not found');
        }
    } catch (error) {
        console.error('Error retrieving author ID:', error.message);
        return null;
    }
};

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


module.exports = {
    getAuthorId,
    getAuthorDetails,
};
