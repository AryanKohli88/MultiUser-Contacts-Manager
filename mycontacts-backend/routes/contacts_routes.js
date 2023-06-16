const express = require("express");
const router = express.Router();
const {
    getContacts,
    creatContact,
    getConact,
    updateContact,
    deleteconatct
} = require("../controllers/contactcontroller");
const validatetoken = require("../middleware/validatetokenhandler");

router.use(validatetoken);
router.route("/").get(getContacts).post(creatContact);
router.route("/:id").get(getConact).delete(deleteconatct).put(updateContact);

module.exports = router;
