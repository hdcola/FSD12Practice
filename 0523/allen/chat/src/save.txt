import "./App.css";
import React, { useState } from 'react';

// 定义 Message 接口
interface Message {
  sender: 'user' | 'bot';
  text: string;
}

// Header 组件
function Header() {
  return (
    <div className="row sticky-top">
      <div className="col m-2" id="header">
        <h1>Chat Box</h1>
      </div>
    </div>
  );
}

// ChatMessages 组件
interface ChatMessagesProps {
  messages: Message[];
}

function ChatMessages(props: ChatMessagesProps) {
  return (
    <div className="row content-row">
      <div className="chat-box chat-messages">
        {props.messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="text">{message.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// UserInput 组件
interface UserInputProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
}

function UserInput(props: UserInputProps) {
  return (
    <div className="row sticky-bottom">
      <div className="col m-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message here..."
            value={props.userInput}
            onChange={(e) => props.setUserInput(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={props.handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ApiSettings 组件
interface ApiSettingsProps {
  apiUrl: string;
  // setApiUrl: React.Dispatch<React.SetStateAction<string>>;
  apiToken: string;
  // setApiToken: React.Dispatch<React.SetStateAction<string>>;
}

function ApiSettings(props: ApiSettingsProps) {
  return (
    <div className="row">
      <div className="col m-2">
        <input
          type="text"
          className="form-control"
          placeholder="API URL"
          value={props.apiUrl}
          onChange={(e) => props.setApiUrl(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="API Token"
          value={props.apiToken}
          onChange={(e) => props.setApiToken(e.target.value)}
        />
      </div>
    </div>
  );
}

// App 组件
function App() {
  const [apiUrl, setApiUrl] = useState<string>('');
  const [apiToken, setApiToken] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async () => {
    if (!userInput) return;
  
    const newMessages: Message[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput, model: 'gemma:7b' }),
      });
  
      const data = await response.json();
      const botReply = data.reply || 'Sorry, I did not understand that.';
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: 'Error communicating with the API.' }]);
    }
  };
  

  return (
    <div className="container-fluid text-center">
      <Header />
      <ApiSettings apiUrl={apiUrl} setApiUrl={setApiUrl} apiToken={apiToken} setApiToken={setApiToken} />
      <ChatMessages messages={messages} />
      <UserInput userInput={userInput} setUserInput={setUserInput} handleSend={handleSend} />
    </div>
  );
}

export default App;
