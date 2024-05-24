require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

function connect(dbName, dbUri) {
    const uri = dbUri + '/' + dbName;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    });
    return connection;
}


const dbName = process.env.MONGO_DB;
const dbUri = process.env.MONGO_URI;
const main = connect(dbName, dbUri);
module.exports = {
    connect,
    main
}
