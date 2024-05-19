require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

function connect(dbName) {
    const uri = process.env.MONGO_URI + dbName;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    });
    return connection;
}


const dbName = process.env.MONGO_DB;
console.log(dbName);
const main = connect(dbName);
module.exports = {
    connect,
    main
}
