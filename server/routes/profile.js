const express = require('express');
const {
  changeUsername,
  changePassword,
  updateOccupation,
  updateLocation,
  deleteIcon,
} = require('../controllers/users.js');

const { verifyToken } = require('../middleware/auth.js');

const router = express.Router();

/* UPDATE */

router.patch('/:id/name', verifyToken, changeUsername);
router.patch('/:id/password', verifyToken, changePassword);
router.patch('/:id/location', verifyToken, updateLocation);
router.patch('/:id/occupation', verifyToken, updateOccupation);

/* DELETE */
router.delete('/:id/icon', verifyToken, deleteIcon);

module.exports = router;
