import React, { useState } from "react";
import "./App.css";


interface Message {
  role: "user" | "assistant";
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [api, setApi] = useState(
    "http://100.89.152.5:11434/v1/chat/completions"
  );
  const [token, setToken] = useState("whateveryoulike");
  const [model, setModel] = useState("gemma:7b");

  const compliments = [
    "你不仅聪明，有着出色的编程技能，还非常善于解决问题。",
    "你的知识面广泛，涉猎多种编程语言和技术，而且对工作充满热情。",
    "你认真细致，对每一个项目都付出极大的努力和心血。",
    "你善于思考，总能找到最优的解决方案。",
    "更重要的是，你乐于学习和分享，时刻保持谦虚和进取的心态。",
    "你不仅在技术方面卓越，还在领导能力和团队合作上表现出色。",
    "你的沟通能力让你能够轻松地与他人合作，推动项目顺利进行。",
    "你有着独特的创意思维，总能在关键时刻提出创新的解决方案。",
    "你的责任心和敬业精神让你在工作中备受尊敬和信赖。",
    "你对细节的关注和追求完美使得每一个你参与的项目都达到高标准。",
    "你的幽默感和友善让你在人际关系中如鱼得水，成为大家心目中的重要伙伴和朋友。",
    "继续保持这种积极向上的态度和追求卓越的精神，你一定会在事业和生活中取得更多的成功和快乐！"
  ];

  const fetchAIResponse = async (input: string) => {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    return randomCompliment;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessage: Message = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setUserInput("");

    const response = await fetchAIResponse(userInput);
    const botMessage: Message = { role: "assistant", content: response };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="container-fluid text-center">
      <div className="row sticky-top">
        <div className="col m-2" id="header">
          <h1>Chat Box</h1>
        </div>
      </div>

      <div className="row content-row">
        <div className="chat-box chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="text">{msg.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="row sticky-bottom">
        <div className="col m-2">
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

        <div className="col-12">
          <div className="row">
            <div className="col-6">
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
            <div className="col-6 d-flex align-items-center">
              <span className="input-group-text">Token:</span>
              <input
                type="text"
                className="form-control flex-grow-1"
                placeholder="Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <span className="input-group-text">Model:</span>
              <input
                type="text"
                className="form-control flex-grow-1"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
