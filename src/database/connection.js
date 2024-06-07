// DB coonection functions

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

/**
 * Opens a connection to a MongoDB database.
 *
 * @param {string} dbName - The name of the database.
 * @param {string} dbUri - The URI of the database.
 * @returns {Promise<mongoose.Connection>} A promise that resolves to the database connection.
 * @throws {Error} If there is an error establishing the database connection.
 */
async function openConnection(dbName, dbUri) {
    try {
        const uri = `${dbUri}/${dbName}`;
        mongoose.connect(uri);
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log("MongoDB database connection established successfully");
        });
        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; 
    }
}

/**
 * Closes the connection to the MongoDB database.
 *
 * @returns {void}
 * @throws {Error} If there is an error closing the database connection.
 */
async function closeConnection() {
    try {
        await mongoose.disconnect();
        console.log("MongoDB connection closed successfully");
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
        throw error;
    }
}

// Export connection functions
module.exports = {
    openConnection,
    closeConnection,
}
