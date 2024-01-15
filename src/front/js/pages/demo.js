import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CalendarView from "../component/calendarView";
import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <h1>Welcome to the awesome CalendApp Alikindoi!</h1>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
      <br />
      <Link to="/about">
        <button className="btn btn-primary">About</button>
      </Link>
      <br />

      <CalendarView />
    </div>
  );
};
