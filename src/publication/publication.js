const https = require('https');

const apiKey = process.env.API_KEY_SCOPUS;

function getScopusData(researcherName, researcherLastName){
    return new Promise((resolve, reject) => {
        https.request({
            hostname: "api.elsevier.com",
            path: '/content/search/author?query=authlast('+researcherLastName+')%20and%20authfirst('+researcherName+')&apiKey='+apiKey,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(data);
                resolve(JSON.parse(data));
                console.log('Data parsed from Scopus by Publication');
            });
        }).on('error', err => {
            reject(err);
        }).end();
    });
}

function getPublication(researcherId){
    return new Promise((resolve, reject) => {
        https.request({
            hostname: "api.elsevier.com",
            path: '/content/search/scopus?query=authid('+researcherId+')&apiKey='+apiKey,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(data);
                resolve(JSON.parse(data));
                console.log('Publication parsed from Scopus by Publication');
            });
        }).on('error', err => {
            reject(err);
        }).end();
    });
}

module.exports = {
    getScopusData,
    getPublication
}