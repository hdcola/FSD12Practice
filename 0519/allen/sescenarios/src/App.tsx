import { useEffect, useState } from "react";
import "./App.css";

interface Scenario {
  name: string;
  description: string;
}

function App() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    fetch("scenarios.json")
      .then((response) => response.json())
      .then((data: { scenarios: Scenario[] }) => setScenarios(data.scenarios))
      .catch((error) => console.error("Error fetching scenarios:", error));
  }, []);

  return (
    <>
      <div className="header container-fluid text-center">
        <div className="row h-row">
          <div className="col-12">
            <h1>Scenario List</h1>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          {scenarios.map((scenario, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
              <div className="card">
                <div className="row">
                  <h3>{scenario.name}</h3>
                  <div className="word-wrap description card-text">
                    {scenario.description}
                  </div>
                  <div className="text-center">
                    <button className="btn">Go</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
