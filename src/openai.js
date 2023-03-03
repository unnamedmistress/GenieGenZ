import { Configuration, OpenAIApi } from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const createOpenAIConfig = new Configuration({
  organization: "org-CjIl4vnLKCaPqr6WGtIhrpQA",
  apiKey: apiKey,
});

const openai = new OpenAIApi(createOpenAIConfig);

function sendToOpenAI(text, apiKey) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    };
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: "Hello world"}],
      temperature: 0.35,
    };
    const requestOptions = {
      'headers': headers,
      'method': 'POST',
      'body': JSON.stringify(requestBody)
    };
    fetch('https://api.openai.com/v1/chat/completions', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.choices && data.choices.length > 0) {
          resolve(data.choices[0].text);
        } else {
          reject('OpenAI API response did not contain expected data');
        }
      })
      .catch(error => {
        console.error(`Error with OpenAI API request: ${error.message}`);
        reject('Sorry, I am asleep');
      });
  });
}

export { sendToOpenAI };