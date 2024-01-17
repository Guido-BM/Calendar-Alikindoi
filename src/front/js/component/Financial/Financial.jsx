import React from "react";
import { iconsImgs } from "../../utils/images.js";

const BACKEND_URL = process.env.BACKEND_URL;

const todoistAuth = () => {
  fetch(`${process.env.BACKEND_URL}/api/todoist/auth`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      try {
        return JSON.parse(text);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const Financial = () => {
  return (
    <div className="subgrid-two-item grid-common grid-c8">
      <div className="grid-c-title">
        <h3 className="text text-silver-v1">TODOIST</h3>
        <button onClick={todoistAuth}>
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <div className="grid-c8-content">
        <p className="text text-silver-v1">
          Ipsum dolor sit amet consectetur, adipisicing elit. Iste, vitae.....
        </p>
      </div>
    </div>
  );
};

export default Financial;
