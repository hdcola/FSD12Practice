import React, { useState, useRef, useEffect } from "react";
import "./App.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [api, setApi] = useState<string>(
    "http://100.89.152.5:11434/v1/chat/completions"
  );
  const [token, setToken] = useState("whateveryoulike");
  const [model, setModel] = useState("gemma:7b");

  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToLastMessage = () => {
    if (messageRefs.current.length > 0) {
      const lastMessageRef =
        messageRefs.current[messageRefs.current.length - 1];
      if (lastMessageRef) {
        lastMessageRef.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessage: Message = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setUserInput("");

    const response = await fetchAIResponse(userInput);
    const botMessage: Message = { role: "assistant", content: response };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const fetchAIResponse = async (input: string) => {
    const requestBody = JSON.stringify({
      model: model,
      prompt: input,
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
    });

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: requestBody,
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error during fetch:", (error as Error).message);
      return `Error fetching response: ${(error as Error).message}`;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const chatHeader = (model) => {
    return model || "Desiginated AI";
  };

  return (
    <div className="container-fluid p-0 text-center">
      <div className="row">
        <div className="col m-2" id="header">
          <h1>AI-{chatHeader(model)}</h1>
        </div>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            ref={(el) => (messageRefs.current[index] = el)}
            className={`message ${msg.role}`}
          >
            <div className="text">{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="container">
        <div className="col">
          <div className="input-group">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder=""
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <label htmlFor="floatingInput">Type your message here...</label>
            </div>

            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>

        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="API"
              value={api}
              onChange={(e) => setApi(e.target.value)}
            />
            <label htmlFor="floatingInput">API</label>
          </div>
        </div>
        <div className="col-6 d-flex ">
          <span className="input-group-text">Token:</span>
          <input
            type="text"
            className="form-control"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <span className="input-group-text">Model:</span>
          <input
            type="text"
            className="form-control"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
