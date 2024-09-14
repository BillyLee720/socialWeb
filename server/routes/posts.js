const express = require("express");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  editPost,
  deletePost,
} = require("../controllers/posts.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/edit", verifyToken, editPost);

/* DELETE */
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
