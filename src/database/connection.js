require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

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

async function closeConnection() {
    try {
        await mongoose.disconnect();
        console.log("MongoDB connection closed successfully");
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
        throw error;
    }
}

module.exports = {
    openConnection,
    closeConnection,
}
