const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const connection = require('../models/connect');

dotenv.config({ path: path.join(__dirname, '.env') });

app.use(express.json());
app.use(helmet());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

// Initialize the database connection
connection();

// POST /api/signup
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received signup request for username: ${username}, password: ${password}`);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user to the database
  const newUser = await User.create({ username, password: hashedPassword });

  console.log(`New user created: ${newUser}`);

  res.json({ message: 'User created successfully' });
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login request for username: ${username}, password: ${password}`);

  // check if user exists in the database
  const user = await User.findOne({ username });
  console.log(`Found user in the database: ${user}`);

  if (!user) {
    console.log('User not found in the database');
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // compare password with hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(`Password match: ${passwordMatch}`);

  if (!passwordMatch) {
    console.log('Invalid password');
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  console.log('Logged in successfully');
  res.json({ message: 'Logged in successfully' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
