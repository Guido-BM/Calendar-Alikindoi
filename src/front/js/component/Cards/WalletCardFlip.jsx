import React, { useState } from "react";
import styled, { css } from "styled-components";
import "./WalletCardFlip.css";
import "../../pages/home.scss";

const WalletCardFlip = (props) => {
      const [isFlipped, setFlipped] = useState(false);

      const handleToggle = () => {
            setFlipped(!isFlipped);
      };

      return (
            <div
                  className={`flip grid-one-item grid-common grid-c1  ${isFlipped ? "flipped" : ""
                        } ${props.className ? props.className : ""}`}
            >
                  <div className="face front">
                        {props.front}
                  </div>
                  <div className="face back">
                        {props.back}
                  </div>
            </div>
      );
};

export default WalletCardFlip;
