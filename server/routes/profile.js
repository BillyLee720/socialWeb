const express = require('express');
const {
  changeUsername,
  updateOccupation,
  updateLocation,
} = require('../controllers/users.js');

const { verifyToken } = require('../middleware/auth.js');

const router = express.Router();

/* UPDATE */

router.patch('/:id/name', verifyToken, changeUsername);
router.patch('/:id/location', verifyToken, updateLocation);
router.patch('/:id/occupation', verifyToken, updateOccupation);

module.exports = router;
