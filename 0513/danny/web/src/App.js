import "./App.css";
import Scenario from "./components/Scenario";
import { useEffect, useState } from "react";

function App() {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("scenarios");
        const data = await response.json();
        setScenarios(data.scenarios);
      } catch (error) {
        console.error("Error fetching scenarios:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {scenarios.map((scenario, index) => (
            <Scenario
              key={index}
              name={scenario.name}
              description={scenario.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
