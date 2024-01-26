// CardSocialIcons.js
import React from "react";
import { iconsContainerStyles, iconStyles } from "./CardStyles";

const CardSocialIcons = ({ githubUrl, linkedinUrl, email }) => {
  return (
    <div style={iconsContainerStyles} className="iconContainer">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={iconStyles} className="icons">
        <i className="fab fa-github"></i>
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={iconStyles} className="icons">
        <i className="fab fa-linkedin"></i>
      </a>
      
    </div>
  );
};

export default CardSocialIcons;