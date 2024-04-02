const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
/* REGISTER USER */

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    //檢查email
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    //加密
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN USER */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    //檢查email
    if (!user) return res.status(400).json({ msg: 'User does not exist.' });
    //核對密碼
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.oauth = async (req, res) => {
  const { sub, given_name, family_name, picture, email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, user });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(sub, salt);
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
      console.log(saveUser);
      res.status(200).json({ token, user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
