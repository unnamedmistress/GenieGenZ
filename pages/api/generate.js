import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const text = req.body.text || '';
  const words = text.trim().split(/\s+/).length;

  if (words < 5 || words > 250) {
    res.status(400).json({
      error: {
        message: "Please enter a text input between 5 and 250 words",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      // PROMPT GOES HERE// To Do: add your own prompt here
      prompt: "Respond as if you are the Genie from the movie Aladdin. Respond to this message as if you are the character and use some of these Generation Z slang words (@me, Bet, Big Mad, Beat Your Face, Boujee, Slay, Baddies, Bussin', Cringe, Facts, Glow-up, Hits different, Lit, Rent Free, Stan, sus, tea, understood the assignment, vibe check, vibing) " + text + "\n\n",
      ///PROMPT ENDS HERE
      max_tokens: 250,
      temperature: 0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
