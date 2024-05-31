"use client";
import { useEffect, useState } from "react";
import "./App.css";

interface Scenario {
  name: string;
  description: string;
}

function App() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    fetch(
      "https://hdcola.github.io/FSD12Practice/0513/danny/web/build/scenarios"
    )
      .then((response) => response.json())
      .then((data: { scenarios: Scenario[] }) => setScenarios(data.scenarios))
      .catch((error) => console.error("Error fetching scenarios:", error));
  }, []);

  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center mt-">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Scenarios
        </span>{" "}
        List.
      </h1>

      <div className="flex flex-wrap justify-center">
      {scenarios.map((scenario, index) => (
        <div
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5"
          key={index}
        >
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {scenario.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {scenario.description}
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            On&apos;y va
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      ))}
      </div>
      
    </>
  );
}

export default App;
