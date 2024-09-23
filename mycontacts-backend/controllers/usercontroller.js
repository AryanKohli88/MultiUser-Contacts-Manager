const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/UserModel");

const regUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }

    const useravailable = await user.findOne({ email });
    if (useravailable) {
        console.log("here")
        return res.status(400).json({ message: "Already registered" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const userobject = await user.create({
        username,
        email,
        password: hashedpassword,
    });

    if (userobject) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: userobject.username,
                    email: userobject.email,
                    id: userobject.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        return res.status(201).json({ _id: userobject.id, email: userobject.email, accessToken });
    } else {
        return res.status(400).json({ message: "User data is not valid" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: `${email ? password : email} is missing.` });
    }

    const userobject = await user.findOne({ email });
    if (userobject && (await bcrypt.compare(password, userobject.password))) {
        const accessToken = jwt.sign({
            user: {
                username: userobject.username,
                email: userobject.email,
                id: userobject.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        return res.status(200).json({ accessToken });
    } else {
        return res.status(401).json({ message: "Email or Password is not valid" });
    }
});

const currUser = asyncHandler(async (req, res) => {
    return res.json(req.user);
});

module.exports = { regUser, loginUser, currUser };
