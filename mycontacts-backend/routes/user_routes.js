const express = require("express");
const { reguser, loginuser , curruser} = require("../controllers/usercontroller");
const validatetoken = require("../middleware/validatetokenhandler");
const router = express.Router();

router.post("/register",reguser);

router.post("/login",loginuser);

router.get("/current", validatetoken ,curruser);

module.exports = router;
