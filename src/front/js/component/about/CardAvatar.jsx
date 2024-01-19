// CardAvatar.js
import React from "react";
import { avatarContainerStyles, avatarImgStyles } from "./CardStyles";


const CardAvatar = ({ avatarSrc }) => {
  return (
    <div style={avatarContainerStyles} className="infoContainer">
      <img src={avatarSrc} style={avatarImgStyles} alt="Avatar" />
    </div>
  );
};

export default CardAvatar;

