import React, { useState } from 'react';
import "./CardFlip.css";
import "../../pages/home.scss";

const CardFlip = (props) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleToggle = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className={`flip grid-one-item  ${isFlipped ? 'flipped' : ''} ${props.className ? props.className : '' }`} onClick={handleToggle}>
      
      
        <div className="face front grid-common"> {props.front}</div>
        <div className="face back grid-common">{props.back}</div>
      </div>
    
  );
};

export default CardFlip;