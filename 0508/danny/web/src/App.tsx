import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function App() {
  const DEFAULT_URL = "http://localhost:8080/api/doctors";
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchData() {
    console.log("Fetching data...");
    setIsLoading(true);
    try {
      const response = await fetch(DEFAULT_URL);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
      <Button variant="primary" onClick={fetchData}>
        Fetch Data
      </Button>
    </>
  );
}

export default App;
