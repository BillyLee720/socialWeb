const express = require('express');
const {
  changeUsername,
  changePassword,
  updateOccupation,
  updateLocation,
  deleteAvatar,
} = require('../controllers/users.js');

const { verifyToken } = require('../middleware/auth.js');

const router = express.Router();

/* UPDATE */

router.patch('/:id/name', changeUsername);
router.patch('/:id/password', verifyToken, changePassword);
router.patch('/:id/location', verifyToken, updateLocation);
router.patch('/:id/occupation', verifyToken, updateOccupation);

/* DELETE */
router.delete('/:id/avatar', verifyToken, deleteAvatar);

module.exports = router;
