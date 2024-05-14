const https = require('https');
apiKey = "30aa24ac07654554de0733cc0dd6a789";

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