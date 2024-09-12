const express = require("express");
const { regUser, loginUser , currUser} = require("../controllers/usercontroller");
const validatetoken = require("../middleware/validatetokenhandler");
const router = express.Router();

router.post("/register",regUser);

router.post("/login",loginUser);

router.get("/current", validatetoken ,currUser);

module.exports = router;
