import React from "react";
import { useState, useEffect } from "react";
import "./Home1.css";

interface Scenario {
  id: number;
  name: string;
  description: string;
  prompt: string;
}

function CardContainer() {
  const [modes, setModes] = useState<Scenario[]>([]);

  useEffect(() => {
    // 从API获取数据
    fetch("http://100.89.152.5:8080/api/scenarios")
      .then((response) => response.json())
      .then((data: Scenario[]) => {
        // 直接处理数组
        console.log(data); // 打印数据以确认结构
        setModes(data); // 设置状态为返回的数组
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const redirectToChat = (scenarioId: number) => {
    window.location.href = `http://localhost:5173/chat?scenarioId=${scenarioId}`;
  };

  return (
    <div className="container">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="card"
          style={{ "--i": `${index - 4}` } as React.CSSProperties}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}

export default CardContainer;
