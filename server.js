import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import openai from 'openai';
import cors from 'cors';
import User from './models/User.js';
import connect from './models/connect.js';

dotenv.config({ path: new URL('./.env', import.meta.url).pathname });


const app = express();

app.use(express.json());
app.use(express.static(path.join(new URL('.', import.meta.url).pathname, 'client', 'build')));

app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

 vapp.get('*', (req, res) => {
  res.sendFile(path.join(new URL('client/build/index.html', import.meta.url)));
});

  
  
  
  
  
  
  
}


connect();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
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
  try {
    const newUser = await User.create({ username, password: hashedPassword });
    console.log(`New user created: ${newUser}`);
    res.json({ message: 'User created successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error && error.code === 11000) {
      console.log(`Username '${username}' already exists in the database`);
      return res.status(400).json({ error: 'Username already exists' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

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
