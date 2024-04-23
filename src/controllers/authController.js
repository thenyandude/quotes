// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username is already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User created', userId: user._id });
  } catch (error) {
    res.status(500).send('Server error during user creation');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }
    res.status(200).send({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).send({ message: 'Server error during login' });
  }
};
