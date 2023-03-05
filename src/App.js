import React, { useState, useRef, useEffect } from "react";
import { Chat } from "@progress/kendo-react-conversational-ui";
import "./App.css";
import openai from './openai.js';
import LoginForm from "./component/LoginForm.js";
import SignupForm from "./component/SignupForm.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const { generateText, moderateText } = openai;
const user = {
  id: 1,
  avatarUrl:
    "https://img.favpng.com/25/12/17/cute-robot-clip-art-png-favpng-FVkLQ59NPt9QUSC9rgwsFHVKQ.jpg",
  avatarAltText: "Genie",
  style: { width: "50px", height: "50px" },
};

const bot = { id: 0 };

const initialMessages = [
  { author: bot, timestamp: new Date(), text: "Hello, What's good?" },
];

const App = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const addNewMessage = async (event) => {
    const message = event.message;
    setMessages([...messages, message, { author: bot, typing: true }]);
    setIsLoading(true);

    if (message.author === user) {
      // generate response from OpenAI API
      const response = await generateText(message.text);

      // add response to messages and remove typing indicator
      setMessages((messages) => {
        const updatedMessages = messages.map((m) => {
          if (m.typing) {
            return {
              author: bot,
              text: response,
              timestamp: new Date(),
              typing: false,
            };
          }
          return m;
        });
        setIsLoading(false);
        return updatedMessages;
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const handleSignupClick = () => {
    setShowSignupForm(true);
  };

  return (
    <div>
      <Router>
        {isLoggedIn ? (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <Chat
                    user={user}
                    messages={messages}
                    onMessageSend={addNewMessage}
                    width={400}
                    messageInput={(props) => (
                      <div style={{ display: "flex" }}>
                        <input
                          type="text"
                          value={props.value}
                          onChange={props.onChange}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              props.onSend();
                              scrollToBottom(); // scroll to bottom after sending
                            }
                          }}
                          placeholder="Type your message here..."
                        />
                        <button onClick={props.onSend}>
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
                    )}
                  />
                }
              />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
            <div ref={messagesEndRef} /> {/* anchor for scrollToBottom */}
          </>
        ) : (
          <LoginForm onLogin={handleLogin} onSignupClick={handleSignupClick} />
        )}
      </Router>
      {isLoading && (
        <div id="typing" className="spinner">
          🤖...
        </div>
      )}
      {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
    </div>
  );
};

export default App;
