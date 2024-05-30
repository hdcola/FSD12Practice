"use client";
import Card from "./components/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const url =
    "https://hdcola.github.io/FSD12Practice/0513/danny/web/build/scenarios";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setScenarios(data.scenarios);
        setLoading(false);
      });
  }, [scenarios, loading]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-4xl font-bold">Scenarios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          scenarios.map((scenario) => (
            <Card
              key={scenario.id}
              title={scenario.name}
              description={scenario.description}
            />
          ))
        )}
      </div>
      <p className="text-lg py-8">
        Welecome to talk with AI in a lot of scenarios.
      </p>
    </main>
  );
}
