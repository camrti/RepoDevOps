require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

function connect(dbName, dbUri) {
    const uri = `${dbUri}/${dbName}`;
    mongoose.connect(uri);
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    });
    return connection;
}

function closeConnection() {
    mongoose.disconnect()
        .then(() => {
            console.log("MongoDB connection closed successfully");
        })
        .catch((err) => {
            console.error("Error closing MongoDB connection:", err);
        });
}

const dbName = process.env.MONGO_DB || "researcherDB";
const dbUri = process.env.MONGO_URI || "mongodb://database-service:27017";
const main = connect(dbName, dbUri);
module.exports = {
    connect,
    closeConnection,
    main
}
