// import necessary packages
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import your User model or schema
const User = require('./user-model');

// create a new Express router for handling user authentication
const router = express.Router();
const User = require('./models/User');
// POST /api/login - handle user authentication
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // check if user exists in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // compare password with hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // generate a JWT token and send it back to the client
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
