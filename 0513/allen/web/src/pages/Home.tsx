import "./Home.css";
import { useState, useEffect } from "react";

interface Scenario {
  id: number;
  name: string;
  description: string;
  prompt: string;
}

function Home() {
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

  // 修改跳转函数以包括 scenarioId
  const redirectToChat = (scenarioId: number) => {
    window.location.href = `http://localhost:5173/chat?scenarioId=${scenarioId}`;
  };

  return (
    <div className="game-modes">
      {modes && modes.map((modes, index) => (
          <div className="mode-container" key={index}>
            <div className="icon" onClick={() => redirectToChat(modes.id)}>
              {modes.name}
            </div>
            <div className="tooltip">{modes.description}</div>
          </div>
        ))}
    </div>
  );
}

export default Home;
