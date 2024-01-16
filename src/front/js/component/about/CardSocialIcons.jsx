// CardSocialIcons.js
import React from "react";
import { iconsContainerStyles, iconStyles } from "./CardStyles";


const CardSocialIcons = () => {
  return (
    <div style={iconsContainerStyles} className="iconContainer">
      <span style={iconStyles} className="icons">
        <i className="fab fa-facebook-square"></i>
      </span>
      <span style={iconStyles} className="icons">
        <i className="fab fa-youtube-square"></i>
      </span>
      <span style={iconStyles} className="icons">
        <i className="fab fa-twitter-square"></i>
      </span>
    </div>
  );
};

export default CardSocialIcons;


