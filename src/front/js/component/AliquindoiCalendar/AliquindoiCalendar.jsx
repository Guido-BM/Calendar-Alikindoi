import React from "react";
import "./AliquindoiCalendar.css";
import { Link } from "react-router-dom";
import { iconsImgs } from "../../utils/images.js";
import { budget } from "../../data/data.js";
import CalendarView from "../calendarView.jsx";

const AliquindoiCalendar = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-item">
        <div className="grid-item-header"></div>
        <div className="grid-item-body">
          <CalendarView />
        </div>
      </div>
    </div>
  );
};

export default AliquindoiCalendar;
