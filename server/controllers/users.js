const User = require('../models/User');

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
    res.status(200).json(updatedName);
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
    const updated = await User.findByIdAndUpdate(
      id,
      {
        location: location,
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
