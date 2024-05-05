const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Platform = require('../models/Platform');

// google

exports.google = async (req, res) => {
  const { sub, given_name, family_name, picture, email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, user });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(sub, salt);
      //create user
      const newUser = new User({
        firstName: given_name,
        lastName: family_name,
        email: email,
        password: passwordHash,
        picturePath: picture,
        friends: [],
        location: null,
        occupation: null,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });
      const saveUser = await newUser.save();
      const user = await User.findOne({ email: email });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      //add new platform
      const newPlatform = new Platform({
        userId: user._id,
        google: sub,
      });
      const savePlatform = await newPlatform.save();
      console.log(saveUser, savePlatform);
      res.status(200).json({ token, user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
