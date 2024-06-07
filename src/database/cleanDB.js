//Utility restore DB function

const { MongoClient } = require('mongodb');
const dbName = "researcherDB";
const dbUri = "mongodb://172.16.174.108:27017";

/**
 * Deletes all documents from all collections in a MongoDB database.
 *
 * @param {string} uri - The URI of the MongoDB database.
 * @param {string} dbName - The name of the database.
 * @returns {void}
 */
async function deleteAllDocuments(uri, dbName) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);

        const collections = await db.collections();

        for (const collection of collections) {
            await collection.deleteMany({});
            console.log(`All documents deleted from collection: ${collection.collectionName}`);
        }

        console.log('All documents deleted from all collections');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

deleteAllDocuments(dbUri, dbName);

