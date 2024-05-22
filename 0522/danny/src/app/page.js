"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import "./page.css";
import React from "react";
import Message from "./components/Message";
import InputArea from "./components/InputArea";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  const [apiUrl, setApiUrl] = useState(
    "http://localhost:11434/v1/chat/completions"
  );
  const [apiToken, setApiToken] = useState("iloveyourapitoken");
  const [model, setModel] = useState("gemma:7b");

  const sendMessage = async () => {
    const prompt = {
      role: "user",
      content: message,
    };

    setMessages([...messages, prompt]);

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        messages: [...messages, prompt],
        model: model,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setResponse(data.choices[0].message.content);
      });
  };

  const chatContent = Array(1).fill(null);

  return (
    <main className="d-flex flex-column h-100">
      {/* chat */}
      <div className="chat-content-area px-2">
        {chatContent.map((_, index) => (
          <React.Fragment key={index}>
            {/* user chat */}
            <Message role="user" content={message} />
            {/* AI response */}
            <Message role="assistant" content={response} />
          </React.Fragment>
        ))}
      </div>

      {/* input */}
      <InputArea
        message={message}
        setMessage={(e) => setMessage(e.target.value)}
        sendMessage={sendMessage}
        apiUrl={apiUrl}
        setApiUrl={(e) => setApiUrl(e.target.value)}
        apiToken={apiToken}
        setApiToken={(e) => setApiToken(e.target.value)}
        model={model}
        setModel={(e) => setModel(e.target.value)}
      />
    </main>
  );
}
