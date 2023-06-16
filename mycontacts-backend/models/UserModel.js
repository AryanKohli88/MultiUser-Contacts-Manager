const mongoose = require("mongoose");
const userschema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add a name"],
    },
    email:{
        type: String,
        required: [true, "Please give emial"],
        unique: [true, "Email add already exists"],
    },
    password: {
        type: String,
        required: [true, "Please pass password"],
    },
    }, 
    {
    timestamps: true,
    }
);

module.exports =mongoose.model("User", userschema);