import React, { useState } from "react";
import "./CardFlip.css";
import "../../pages/home.scss";

const CardWallet = (props) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleToggle = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip grid-one-item grid-common grid-c1  ${
        isFlipped ? "flipped" : ""
      } ${props.className ? props.className : ""}`}
    >
      <div className="face front">
        {" "}
        {props.front}
        <i
          className="fa-solid fa-eye flip-icon"
          onClick={handleToggle}
        ></i>
      </div>
      <div className="face back">
        {props.back}

        <i
          className="fa-solid fa-arrow-rotate-left flip-icon"
          onClick={handleToggle}
        ></i>
      </div>
    </div>
  );
};

export default CardWallet;