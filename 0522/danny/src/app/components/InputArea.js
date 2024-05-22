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
}) {
  return (
    <div className="input-area">
      <Container fluid>
        <Row className="my-1">
          <Col>
            <InputGroup>
              <Form.Control
                as="textarea"
                rows={2}
                value={message}
                onChange={setMessage}
              />
              <div>
                <button
                  className="btn btn-outline-primary m-2"
                  onClick={sendMessage}
                >
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
