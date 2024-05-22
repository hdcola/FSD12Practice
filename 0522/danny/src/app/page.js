"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import OpenAI from "openai";
import "./page.css";
import React from "react";
import Message from "./components/Message";
import InputArea from "./components/InputArea";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [apiUrl, setApiUrl] = useState("http://localhost:11434/v1/chat");
  const [apiToken, setApiToken] = useState("iloveyourapitoken");
  const [model, setModel] = useState("gemma:7b");

  const chatContent = Array(1).fill(null);

  return (
    <main className="d-flex flex-column h-100">
      {/* chat */}
      <div className="chat-content-area px-2">
        {chatContent.map((_, index) => (
          <React.Fragment key={index}>
            {/* user chat */}
            <Message role="user" content="Hello world." />
            {/* AI response */}
            <Message role="assistant" content={message} />
          </React.Fragment>
        ))}
      </div>

      {/* input */}
      <InputArea
        message={message}
        setMessage={(e) => setMessage(e.target.value)}
        sendMessage={() => console.log("sendMessage")}
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
