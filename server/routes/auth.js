const express = require('express');
const { login } = require('../controllers/auth');
const { google } = require('../controllers/oauth');

const router = express.Router();

router.post('/login', login);

//oauth
router.post('/oauth/google', google);

//update
// router.update('');

module.exports = router;
