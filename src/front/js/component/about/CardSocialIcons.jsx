// CardSocialIcons.js
import React from "react";
import { iconsContainerStyles, iconStyles } from "./CardStyles";


const CardSocialIcons = () => {
  return (
    <div style={iconsContainerStyles} className="iconContainer">
      <span style={iconStyles} className="icons">
        <i class="fa-brands fa-github"></i>
      </span>
      <span style={iconStyles} className="icons">
        <i class="fa-brands fa-linkedin"></i>
      </span>
      <span style={iconStyles} className="icons">
        <i class="fa-solid fa-envelope"></i>
      </span>
    </div>
  );
};

export default CardSocialIcons;


