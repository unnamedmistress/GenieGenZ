import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { join } from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import openai from 'openai';

import User from './models/User.js';
import connect from './models/connect.js';

dotenv.config({ path: new URL('./.env', import.meta.url).pathname });


const app = express();

app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Initialize the OpenAI API client
const openaiClient = new openai(process.env.REACT_APP_OPENAI_API_KEY);

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
connect();

// POST /api/signup
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received signup request for username: ${username}, password: ${password}`);

  // Moderate the password
  const moderationResponse = await openaiClient.moderateText(password);
  if (moderationResponse.flagged) {
    console.log(`Password '${password}' was flagged for moderation: ${JSON.stringify(moderationResponse)}`);
    return res.status(403).json({ error: 'Password is not allowed' });
  }

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
      return res.status(400).json({ error: 'Invalid username or password' });
  }

  // compare password with hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(`Password match: ${passwordMatch}`);

  if (!passwordMatch) {
    console.log('Invalid password');
    return res.status(400).json({ error: 'Invalid username or password' });
  }
  res.status(200).json({ success: true, message: 'Login successful' });

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
