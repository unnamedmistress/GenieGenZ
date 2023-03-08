import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const How = () => {
  return (
    <div className="container">
      <h1>How to Use Tutor Genie</h1>
      <h2>Frequently Asked Questions</h2>
      <h3>1. How do I start a conversation with Tutor Genie?</h3>
      <p>
        To start a conversation with Tutor Genie, simply type your message in the
        message input box and press enter or click the send button. Tutor Genie will
        respond to your message automatically using the OpenAI language model.
      </p>
      <h3>2. How do I know this is safe for my child to use?</h3>
      <p>
        The text entered is checked against a moderation policy to ensure that it is appropriate.
        If the text is not appropriate, the message will not be sent and you will be prompted to
        enter a different message.
        The AI is also instructed to not respond to questions about sex, drugs or violence.

      </p>
      <h3>3. How do I end the conversation with Tutor Genie?</h3>
      <p>
        To end the conversation with Tutor Genie, click the "Logout" button at
        the bottom of the chat window. 
      </p>
      <h3>4. How do I know the answer is correct?</h3>
      <p>
       Tutor Genie uses the latest AI technology to provide answers to your questions.
       This technology allows Tutor Genie to learn from the questions you ask and the
         answers you receive. It is limited to information publicly available up to 2021.
      </p>
      <h3>5. What kind of questions can it answer?</h3>
      <p>
        Unlike googling, Tutor Genie can answer questions about a wide variety of topics.
        It can answer questions about history, science, math, geography, sports, music,
        movies, TV shows, books, and more. It can also answer questions about the weather,
        the stock market, and the latest news. It can even answer questions about itself.
      </p>
      <h3>6. Is this cheating?</h3>
      <p>
       You should always check your school policy to see if using Tutor Genie is allowed.
         Tutor Genie is not intended to be used as a substitute for studying. It is intended
            to be used as a supplement to studying. You should use it to enhance your learning.
      </p>
    </div>
  );
};

export default How;
