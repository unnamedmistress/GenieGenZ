import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
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
app.use(express.static(__dirname + "/build", { 
  setHeaders: (res, path) => {
    if (path.endsWith(".js")) {
      res.setHeader("Content-Type", "text/javascript");
    }
  }
}));

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
// POST /api/signup
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received signup request for username: ${username}, password: ${password}`);

  try {
    // check if user already exists in the database
    const user = await User.findOne({ username });
    if (user) {
      console.log('Username already exists');
      return res.status(400).json({ error: 'Username already exists' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hash of password', hashedPassword);

    // create new user in the database
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: 'Signup successful' });
  } catch (error) {
    console.error('Error while signing up user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login request for username: ${username}, password: ${password}`);

  try {
    // check if user exists in the database
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hash of password', hashedPassword);

    // compare password with hashed password in the database
    console.log(`Hashed password from the database: ${user.password}`);
    console.log(`Hashed password from the input: ${hashedPassword}`);
    const passwordMatch = await bcrypt.compare(hashedPassword, user.password);
    console.log(`Password match: ${passwordMatch}`);
  
    if (!passwordMatch) {
      console.log('Invalid password');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error while logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
