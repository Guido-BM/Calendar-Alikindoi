// CardBio.js
import React from "react";
import { bioContainerStyles, bioStyles } from "./CardStyles";


const CardBio = ({ bio }) => {
  return (
    <div style={bioContainerStyles} className="bioContainer">
      <p style={bioStyles} className="bio">
        {bio}
      </p>
    </div>
  );
};

export default CardBio;

