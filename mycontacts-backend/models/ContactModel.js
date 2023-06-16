const mongoose = require("mongoose");
const contactschema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    name:{
        type: String,
        required: [true, "Please add"],
    },
    email: {
        type: String,
        required: [true, "Please add"],
    },
    phone : {
        type: String,
        required: [true, "Please add"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactschema);

