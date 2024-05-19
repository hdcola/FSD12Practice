"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function Home() {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiURL, setApiURL] = useState("scenarios");

  const fetchScenarios = useCallback(async () => {
    setLoading(true);
    const response = await fetch(apiURL);
    const data = await response.json();
    setScenarios(data.scenarios);
    setLoading(false);
  }, [apiURL]);

  useEffect(() => {
    fetchScenarios();
    return () => {
      console.log("cleanup");
    };
  }, [fetchScenarios]);

  return (
    <main className="">
      <h1>Scenarios</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container fluid>
          <Row className="mx-1">
            {scenarios.map((scenario) => (
              <Col
                sm={6}
                md={4}
                lg={3}
                key={scenario.name}
                className="d-flex my-2"
              >
                <Card>
                  <Card.Body>
                    <Card.Title>{scenario.name}</Card.Title>
                    <Card.Text>{scenario.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary">Practice</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </main>
  );
}
