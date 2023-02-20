import React, { useState } from "react";
import { Chat } from "@progress/kendo-react-conversational-ui";
import "./App.css";
import { sendToOpenAI } from "./openai.js";

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
  const addNewMessage = async (event) => {
    const message = event.message;
    setMessages([...messages, message, { author: bot, typing: true }]);
    setIsLoading(true);
  
    if (message.author === user) {
      sendToOpenAI(message.text).then(response => {
        setMessages(messages => {
          const updatedMessages = messages.map(m => {
            if (m.typing) {
              return { author: bot, text: response, timestamp: new Date(), typing: false };
            }
            return m;
          });
          setIsLoading(false);
          return updatedMessages;
        });
      });
    }
  };
  return (
    <div
      id="chatbox"
      className="my-3"
      style={{
        height: "400px",
        border: "1px",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        maxHeight: "400px",
      }}
    >
      {isLoading && (
        <div
          id="typing"
          style={{
            color: "#000",
            fontSize: "1.5em",
            marginRight: "0.5em",
          }}
        >
          Typing...
        </div>
      )}
      <Chat
        user={user}
        messages={messages}
        onMessageSend={addNewMessage}
        width={500}
        style={{ backgroundColor: "#343a40", borderRadius: "5px" }}
        messageBoxStyle={{
          backgroundColor: "#f5f5f5",
          color: "#000",
          borderRadius: "5px",
          flex: 1,
          maxHeight: "400px",
        }}
        bubbleStyle={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          color: "#000",
          maxWidth: "100%",
          wordWrap: "break-word",
          maxHeight: "400px",
        }}
        sendButtonStyle={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
        }}
        sendButtonContent={
          <i className="bi bi-arrow-right" style={{ paddingRight: "5px" }}></i>
        }
        messageList={(props) => (
          <div style={{ flex: 1 }}>
            {isLoading && (
              <div
                id="typing"
                style={{
                  color: "#000",
                  fontSize: "1.5em",
                  marginRight: "0.5em",
                }}
              >
                Typing...
              </div>
            )}
            {props.messages.map((message, index) => (
              <div
                key={index}
                className={
                  "chat-message chat-message-" + message.author.position
                }
              >
                <div
                  style={{ fontSize: "12px", marginTop: "5px", color: "#fff" }}
                >
                  {message.timestamp.toLocaleString()}
                </div>
                <p style={{ marginTop: "5px" }}>{message.text}</p>
              </div>
            ))}
          </div>
        )}
        messageInput={(props) => (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px", maxHeight: "400px" }}
          >
            <input
              type="text"
              value={props.value}
              onChange={props.onChange}
              onKeyDown={props.onKeyDown}
              placeholder={"What's good?"}
              style={{
                backgroundColor: "#f5f5f5",
                color: "#000",
                borderRadius: "5px",
                padding: "5px",
                flex: 1,
              }}
            />
            <button
              onClick={props.onSend}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                marginLeft: "5px",
              }}
            >
              <i className="bi bi-arrow-right" style={{ paddingRight: "5px" }}></i>
            </button>
          </div>
        )}
      />
    </div>
  );
            }  
export default App;
