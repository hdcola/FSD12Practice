"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useRef } from "react";
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
  const chatRef = useRef(chat);

  const sendMessage = async () => {
    const prompt = {
      role: "user",
      content: message,
    };
    setMessage("");
    setChat((currentChat) => {
      const newChat = [...currentChat, prompt];
      chatRef.current = newChat;
      return newChat;
    });
    console.log(chatRef.current);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        messages: [...chat, prompt],
        model: model,
        stream: true,
      }),
    });

    if (!response.ok) {
      console.error("Failed to send message");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const processChunk = ({ done, value }) => {
      if (done) {
        return;
      }

      const chunk = decoder.decode(value, { stream: true });
      console.log(chunk);

      // split chunk into lines
      const lines = chunk.split("\n");
      // if line is "data: [DONE]" then return
      lines.forEach((dataString) => {
        // remove "data: " from string
        const cleanMessage = dataString.replace("data: ", "");
        if (cleanMessage === "[DONE]") {
          return;
        } else if (cleanMessage.length > 0) {
          console.log(cleanMessage);
          const data = JSON.parse(cleanMessage + "\n");

          // if last chat message is not from user, append result to chat
          if (chatRef.current[chatRef.current.length - 1].role === "user") {
            setChat((currentChat) => {
              const newChat = [...currentChat, data.choices[0].delta];
              chatRef.current = newChat;
              return newChat;
            });
          } else {
            // append content to last chat message
            console.log("append:", data.choices[0].delta.content);
            chatRef.current[chatRef.current.length - 1].content +=
              data.choices[0].delta.content;
            setChat([...chatRef.current]);
          }
        }
      });

      return reader.read().then(processChunk);
    };

    reader.read().then(processChunk);
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
