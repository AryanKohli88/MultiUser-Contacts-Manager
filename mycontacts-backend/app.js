const express = require("express");
const dotenv = require("dotenv").config();
const errorhandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbconnection");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

connectDb();

app.use(cors({
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Enable cookies and other credentials
  }));  


app.use(express.json());
app.use(errorhandler);
app.use("/api/contacts", require("./routes/contacts_routes"));
app.use("/api/users", require("./routes/user_routes"));
app.get('/', (req,res) =>{
    res.send("hi");
})
app.listen(port, '0.0.0.0', () => {
    console.log(`Serever running on port ${port}` );
});
