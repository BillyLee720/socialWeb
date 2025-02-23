const express = require("express");
const { login } = require("../controllers/auth");
const { google, twitterx } = require("../controllers/oauth");

const router = express.Router();

router.post("/login", login);

//oauth
router.post("/oauth/google", google);
router.post("/oauth/twitterx", twitterx);

//update
// router.update('');

module.exports = router;
