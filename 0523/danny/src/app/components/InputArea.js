import { Form, Container, Row, Col, InputGroup } from "react-bootstrap";

function InputArea({
  message,
  setMessage,
  sendMessage,
  apiUrl,
  setApiUrl,
  apiToken,
  setApiToken,
  model,
  setModel,
  clearChat,
}) {
  return (
    <div className="input-area">
      <Container fluid>
        <Row className="my-1">
          <Col>
            <InputGroup>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={setMessage}
              />
              <div className="d-flex flex-column">
                <button
                  className="btn btn-outline-primary m-2"
                  onClick={sendMessage}
                >
                  <i className="bi bi-send-fill"></i>
                </button>
                <button
                  className="btn btn-outline-primary m-2"
                  onClick={clearChat}
                >
                  <i className="bi bi-x-octagon"></i>
                </button>
              </div>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="my-1">
            <InputGroup>
              <InputGroup.Text>API URL</InputGroup.Text>
              <Form.Control type="text" value={apiUrl} onChange={setApiUrl} />
              <datalist id="api-url-list">
                <option value="https://api.openai.com/v1/chat/completions" />
                <option value="http://localhost:11434/v1/chat/completions" />
              </datalist>
            </InputGroup>
          </Col>
          <Col md={3} className="my-1">
            <InputGroup>
              <InputGroup.Text>API Token</InputGroup.Text>
              <Form.Control
                type="text"
                value={apiToken}
                onChange={setApiToken}
              />
            </InputGroup>
          </Col>
          <Col md={3} className="my-1">
            <InputGroup>
              <InputGroup.Text>Model</InputGroup.Text>
              <Form.Control type="text" value={model} onChange={setModel} />
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InputArea;
