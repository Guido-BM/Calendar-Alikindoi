// CardTitle.js
import React from "react";
import { titleStyles, subTitleStyles } from "./CardStyles";

const CardTitle = ({ targetId, title, subTitle }) => {
  return (
    <div className="titleDiv">
      <h1 id={targetId} style={titleStyles} className="title">
        {title}
      </h1>
      <h4 style={subTitleStyles} className="subTitle">
        {subTitle}
      </h4>
    </div>
  );
};

export default CardTitle;


