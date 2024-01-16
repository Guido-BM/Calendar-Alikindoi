// CardImg.js
import React from "react";
import { imgContainerStyles, imgStyles } from "./CardStyles";


const CardImg = ({ imgSrc }) => {
  return (
    <div style={imgContainerStyles} className="imgContainer">
      <img src={imgSrc} className="img" style={imgStyles} alt="Avatar" />
    </div>
  );
};

export default CardImg;


