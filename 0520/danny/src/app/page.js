"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import OpenAI from "openai";
import "./page.css";
import React from "react";

export default function Home() {
  const [messages, setMessages] = useState("");
  const [response, setResponse] = useState("");
  const [apiUrl, setApiUrl] = useState("http://localhost:11434/v1/chat");
  const [apiToken, setApiToken] = useState("iloveyourapitoken");
  const [model, setModel] = useState("gemma:7b");

  const chatContent = Array(10).fill(null);

  return (
    <main className="d-flex flex-column h-100">
      {/* chat */}
      <div className="chat-content-area px-2">
        {chatContent.map((_, index) => (
          <React.Fragment key={index}>
            {/* user chat */}
            <div className="d-flex flex-row user-chat-box">
              <div className="chat-icon">
                <i class="bi bi-person-circle"></i>
              </div>
              <div className="chat-text">{index}Hello world.</div>
            </div>
            {/* AI response */}
            <div className="d-flex flex-row ai-chat-box">
              <div className="chat-icon">
                <i class="bi bi-robot"></i>
              </div>
              <div className="chat-text">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
                odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
                turpis. Suspendisse urna nibh viverra non semper suscipit
                posuere a pede. Donec nec justo eget felis facilisis fermentum.
                Aliquam porttitor mauris sit amet orci. Aenean dignissim
                pellentesque felis. Morbi in sem quis dui placerat ornare.
                Pellentesque odio nisi euismod in pharetra a ultricies in diam.
                Sed arcu. Cras consequat. Praesent dapibus neque id cursus
                faucibus tortor neque egestas auguae eu vulputate magna eros eu
                erat. Aliquam erat volutpat. Nam dui mi tincidunt quis accumsan
                porttitor facilisis luctus metus. Phasellus ultrices nulla quis
                nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem
                tristique cursus. Nam nulla quam gravida non commodo a sodales
                sit amet nisi.
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* input */}
      <div className="input-area">
        <Container fluid>
          <Row className="my-1">
            <Col>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                />
                <div>
                  <a className="btn btn-outline-primary m-2" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-send-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                  </a>
                </div>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="my-1">
              <InputGroup>
                <InputGroup.Text>API URL</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3} className="my-1">
              <InputGroup>
                <InputGroup.Text>API Token</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3} className="my-1">
              <InputGroup>
                <InputGroup.Text>Model</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
}
