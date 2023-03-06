import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as openai from 'openai';
import cors from 'cors';
import User from './models/User.js';
import connect from './models/connect.js';

// Set up environment variables and constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: new URL('./.env', import.meta.url).pathname });

// Initialize the express app and middleware
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/build'));



app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(cors());

connect();

// Connect to MongoDB
mongoose.connect(process.env.REACT_APP_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => console.error('Could not connect to MongoDB', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

// Set up the OpenAI API key
openai.apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login request for username: ${username}, password: ${password}`);

  // check if user exists in the database
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    const newUser = new User({ username: req.body.username });
    await newUser.save();
    res.send('User added successfully!');
  } else {
    res.send('Username already exists.');
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
