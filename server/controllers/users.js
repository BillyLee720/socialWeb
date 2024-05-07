const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* READ */
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
exports.addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      console.log(friend);
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

exports.changeUsername = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const updatedName = await User.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    );
    const updateUserPost = await Post.updateMany(
      { userId: id },
      {
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    );
    const updatedPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ user: updatedName, posts: updatedPosts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const { password } = req.body;
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword)
      return res.status(400).json({ message: 'Password is same' });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const result = await User.findByIdAndUpdate(
      id,
      {
        password: passwordHash,
      },
      { new: true }
    );
    res.status(200).json(result);
    // console.log(isSamePassword, password, passwordHash);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateOccupation = async (req, res) => {
  try {
    const { id } = req.params;
    const { occupation } = req.body;
    const updated = await User.findByIdAndUpdate(
      id,
      {
        occupation: occupation,
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;
    const updateLocation = await User.findByIdAndUpdate(
      id,
      {
        location: location,
      },
      { new: true }
    );
    const updateUserPost = await Post.updateMany(
      { userId: id },
      {
        location: location,
      },
      { new: true }
    );
    const updatedPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ user: updateLocation, posts: updatedPosts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.changeAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { imagePath } = req;
    const updatedAvatar = await User.findByIdAndUpdate(
      id,
      {
        picturePath: imagePath,
      },
      { new: true }
    );

    const updateUserPost = await Post.updateMany(
      { userId: id },
      {
        userPicturePath: imagePath,
      },
      { new: true }
    );
    const updatedPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ user: updatedAvatar, posts: updatedPosts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
exports.deleteAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const noAvatar =
      'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1';
    const deleteAvatar = await User.findByIdAndUpdate(
      id,
      {
        picturePath: noAvatar,
      },
      { new: true }
    );
    const updateUserPost = await Post.updateMany(
      { userId: id },
      {
        userPicturePath: noAvatar,
      },
      { new: true }
    );
    const updatedPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ user: deleteAvatar, posts: updatedPosts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
