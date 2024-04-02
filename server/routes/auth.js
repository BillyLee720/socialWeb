const express = require('express');
const { login, oauth } = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.post('/oauth', oauth);

module.exports = router;
