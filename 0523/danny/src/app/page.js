"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import "./page.css";
import ChatContentArea from "./components/ChatContentArea";
import InputArea from "./components/InputArea";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [apiUrl, setApiUrl] = useState(
    "http://localhost:11434/v1/chat/completions"
  );
  const [apiToken, setApiToken] = useState("iloveyourtoken");
  const [model, setModel] = useState("gemma:7b");

  const sendMessage = async () => {
    const chatContentArea = document.querySelector(".chat-content-area");
    const prompt = {
      role: "user",
      content: message,
    };
    setMessage("");
    setChat([...chat, prompt]);

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        messages: [...chat, prompt],
        model: model,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setChat([...chat, prompt, data.choices[0].message]);
      });
  };

  const clearChat = () => {
    setChat([]);
  };

  return (
    <main className="d-flex flex-column h-100">
      {/* chat */}
      <ChatContentArea chat={chat} />

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
        clearChat={clearChat}
      />
    </main>
  );
}
