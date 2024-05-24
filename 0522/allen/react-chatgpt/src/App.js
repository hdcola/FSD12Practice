
import { useState } from "react";

import Message from "./components/Message";
import Input from "./components/Input";
import History from "./components/History";
// import Clear from "./components/Clear";

// import "./styles.css";

function handleSubmit(){

};

function clear(){

};

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    const prompt = {
      role: "user",
      content: input,
    };

    setMessages([...messages, prompt]);

    await fetch("http://100.89.152.5:11434/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `iloveyourapitoken`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma:7b",
        messages: [...messages, prompt],
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        const res = data.choices[0].message.content;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: res,
          },
        ]);
        setHistory((history) => [...history, { question: input, answer: res }]);
        setInput("");
      });
  };

  const clear = () => {
    setMessages([]);
    setHistory([]);
  };


  return (
    <div className="App">
      <div className="Column">
        <h3 className="Title">Chat Messages</h3>
        <div className="Content">
          {messages.map((el, i) => {
            return <Message key={i} role={el.role} content={el.content} />;
          })}
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={input ? handleSubmit : undefined}
        />
      </div>
      <div className="Column">
        <h3 className="Title">History</h3>
        <div className="Content">
          {history.map((el, i) => {
            return (
              <History
                key={i}
                question={el.question}
                onClick={() =>
                  setMessages([
                    { role: "user", content: history[i].question },
                    { role: "assistant", content: history[i].answer },
                  ])
                }
              />
            );
          })}
        </div>
        {/* <Clear onClick={clear} /> */}
      </div>
    </div>
  );
}