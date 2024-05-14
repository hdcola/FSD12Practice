import React, { useState } from "react";
import "./Scenario.css";
import challenge from "../img/challenge.png";

const Scenario = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="col-6 col-sm-3"

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="scenario"       
      style={{
        backgroundImage: `url(${challenge})`,
        backgroundSize: isHovered ? "100%" : "90%",
        transition: "background-size 0.3s ease-in-out",
        width: "100%",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#fff",
        cursor: "pointer",
      }}>
        {text}
      </div>
    </div>
  );
};

export default Scenario;
