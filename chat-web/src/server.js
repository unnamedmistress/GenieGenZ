const express = require('express');
const helmet = require('helmet');
const app = express();
const { createOpenAIConfig, sendToOpenAI } = require('./openai');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(helmet());

const port = process.env.PORT || 3000;
console.log(`OpenAI API key: ${process.env.OPENAI_API_KEY}`);

const openaiConfig = createOpenAIConfig({
  apiKey: process.env.OPENAI_API_KEY
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
