const express = require("express");
const { login } = require("../controllers/auth");
const { google, facebook } = require("../controllers/oauth");

const router = express.Router();

router.post("/login", login);

//oauth
router.post("/oauth/google", google);
router.post("/oauth/facebook", facebook);

//update
// router.update('');

module.exports = router;
