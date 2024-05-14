import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Chat.css";

function InputArea() {
  const [inputValue, setInputValue] = useState("");
  const [scenarioData, setScenarioData] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitData();
    }
  };

  const handleClick = () => {
    submitData();
  };

  const submitData = async () => {
    if (inputValue.trim()) {
      try {
        const response = await fetch('http://localhost:9090/api/chats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sid: new URLSearchParams(window.location.search).get('scenarioId'),
            message: inputValue
          })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Message sent:', inputValue);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
      setInputValue(""); // 清除输入框
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const sidValue = new URLSearchParams(window.location.search).get('scenarioId');
      console.log(`Fetching data for scenarioId: ${sidValue}`);
      try {
        const response = await fetch(`http://100.89.152.5:8080/api/scenarios?sid=${sidValue}`);
        if (!response.ok)
          throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();
        const scenario = data.find((scenario: { id: number }) => scenario.id === Number(sidValue));
        if (scenario) {
          setScenarioData({
            name: scenario.name,
            description: scenario.description,
          });
        } else {
          console.error("Scenario not found for the given id:", sidValue);
        }
      } catch (error) {
        console.error("Error fetching scenario data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Form>
      <div className="contentChat">
        {scenarioData && (
          <div className="descriptionChat">
            <h1>
              {scenarioData.name}
              <br />
              {scenarioData.description}
            </h1>
          </div>
        )}
        <div className="gf">
          <img src="original.png" alt="GF" />
        </div>
      </div>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          rows={3}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Say something to your GF"
        />
      </Form.Group>
      <div className="btn">
        <Button onClick={handleClick}>Submit</Button>
      </div>
    </Form>
  );
}

export default InputArea;
