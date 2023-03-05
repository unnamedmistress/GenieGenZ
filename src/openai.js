import { Configuration, OpenAIApi } from 'openai';
import axios from "axios";
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});

const moderateText = async (text) => {
  const response = await openai.post("/moderations", { input: text });
  console.log(response.data);
  console.log(response.data.results[0].flagged);
  if (response.data.rejected) {
    window.alert("The message has been rejected.");
  }
  console.log('moderation: ' +response.data.results[0].flagged);
  return response.data.results[0].flagged;
};
const generateText = async (text) => {
  console.log('generateText:', text);
  try {
    const isFlagged = await moderateText(text);
    if (!isFlagged) {
      const completion = await openai.post("/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }],
        n: 1,
        stop: null,
      });
      console.log(completion.data);
      console.log("line 35" + completion.data.choices[0].message)
      console.log("Line 36 " + completion.data.choices[0].message.content)
      return completion.data.choices[0].message.content
    } else {
      console.log("Message is flagged. Not generating text.")
      return alert ("Message is flagged as inappropriate. Please rephrase your question and try again.");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { generateText, moderateText };

