const express = require("express");
const dotenv = require("dotenv").config();
const errorhandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbconnection");
const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.use(express.json());
app.use(errorhandler);
app.use("/api/contacts", require("./routes/contacts_routes"));
app.use("/api/users", require("./routes/user_routes"));
app.listen(port, () => {
    console.log(`Serever running on port ${port}` );
});


