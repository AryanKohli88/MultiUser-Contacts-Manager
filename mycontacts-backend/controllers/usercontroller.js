const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/UserModel");
//@desc get all contacts
//@route GET /api/users
//@access public 
const reguser = asyncHandler(async (req, res) => {

    const {username , email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandetory");
    }
    const useravailable = await user.findOne({email});
    if(useravailable){
        res.status(400);
        throw new Error("Already registered");
    }
    const hashedpassword = await bcrypt.hash(password,10);
    console.log("Hashed password", hashedpassword);

    const userobject = await user.create({
        username,
        email,
        password: hashedpassword,
    });
    console.log(`User created ${userobject}`);
    if(userobject){
        res.status(201).json({_id: userobject.id, email: userobject.email});
    } else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({message: "Register the user"});
});

//@access public 
const loginuser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fiels important");
    }

    const userobject = await user.findOne({email});
    // compare passwords
    if(userobject && (await bcrypt.compare(password, userobject.password))){
        const accessToken = jwt.sign({
            user:{
                username: userobject.username,
                email: userobject.email,
                id: userobject.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401).json("Password does not match");
        throw new Error("Email or Password is no valid");
    }

});

//@access private
const curruser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {reguser, loginuser, curruser};