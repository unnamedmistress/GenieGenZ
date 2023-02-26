const express = require('express');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./model/User');
const connection = require('./model/connect');


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

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user to the database
  const newUser = await User.create({ username, password: hashedPassword });

  // Generate a JWT
  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

  // Send the token back to the client
  res.json({ token });
});
dotenv.config({ path: path.join(__dirname, '.env') });

app.use(express.json());
app.use(helmet());

const port = process.env.PORT || 3000;

const openaiConfig = createOpenAIConfig({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});


app.post('/api/generate', async (req, res) => {
  const text = req.body.text;
  try {
    const response = await sendToOpenAI(text, openaiConfig);
    res.json({ result: response });
  } catch (err) {
    console.error(`Error generating message from OpenAI: ${err}`);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
