import React from "react";
import "./Budget.css";
import { Link } from "react-router-dom";
import { iconsImgs } from "../../utils/images.js";
import { budget } from "../../data/data.js";
import CalendarView from "../../component/calendarView.js";

const Budget = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-item">
        <div className="grid-item-header">
          <h3>Calendar</h3>
        </div>
        <div className="grid-item-body">
          <CalendarView />
        </div>
      </div>
    </div>
  );
};

export default Budget;

// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import CalendarView from "../component/calendarView";
// import { Context } from "../store/appContext";

// export const Demo = () => {
//   const { store, actions } = useContext(Context);

//   return (
//     <div className="container">
//       <h1>Welcome to the awesome CalendApp Alikindoi!</h1>
//       <br />
//       <Link to="/">
//         <button className="btn btn-primary">Back home</button>
//       </Link>
//       <br />
//       <Link to="/about">
//         <button className="btn btn-primary">About</button>
//       </Link>
//       <br />

//       <CalendarView />
//     </div>
//   );
// };
