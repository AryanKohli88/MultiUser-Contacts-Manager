const mongoose = require("mongoose");
const yourSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String
}, { collection: 'yourCollectionName' }); // Specify the collection name here

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected: " , connect.connection.host, connect.connection.name);
        
    }
    catch (err) {
        console.log(err);
        process.exit;
    }
};
module.exports = connectDb;