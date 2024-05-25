import React, { useState } from 'react';
import './App.css';

// Define a type for the messages in the chat
interface Message {
  type: 'user' | 'bot';
  text: string;
}

function App() {
  // Use the Message interface for initializing the state
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [api, setApi] = useState('');
  const [token, setToken] = useState('');
  const [model, setModel] = useState('');

  const handleSendMessage = async () => {
    //这行代码检查用户输入（userInput）是否为空（或只包含空格）。使用 .trim() 方法去除前后的空白字符，如果结果为空字符串，则 if 条件为真，函数将执行 return 语句，即直接返回而不继续执行后面的代码。这是为了防止发送空消息。
    if (!userInput.trim()) return; 
    const newMessage: Message = { type: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    const response = await fetchAIResponse(userInput);
    const botMessage: Message = { type: 'bot', text: response };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setUserInput('');
  };

  const fetchAIResponse = async (input: string) => {
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ model: model, prompt: input })
      });
      const data = await response.json();
      return data.message; // Adjust according to the API response structure
    } catch (error) {
      return 'Error fetching response';
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
            <div key={index} className={`message ${msg.type}`}>
              <div className="text">{msg.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="row sticky-bottom">
        <div className="col m-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message here..."
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" type="button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="API"
                value={api}
                onChange={(e) => setApi(e.target.value)}
              />
            </div>
            <div className="col-6 d-flex align-items-center">
              <span className="input-group-text">@</span>
              <input
                type="text"
                className="form-control flex-grow-1"
                placeholder="Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <span className="input-group-text">@</span>
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
