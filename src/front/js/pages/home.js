import React from "react";
import Cards from "../component/Cards/Cards";
import Report from "../component/Report/Report";
import Budget from "../component/Budget/Budget";
import Wallet from "../component/Subscriptions/Wallet";
import Financial from "../component/Financial/Financial";
import Pomodoro from "../component/Pomodoro/Pomodoro";


import "./home.scss";
import CardFlip from "../component/Cards/CardFlip";
import { Weather } from "../component/weather/Weather";

export const Home = () => {
  return (
    <>
      <div className="home" style={{ height: "100vh" }}>
        <div className="main-content">
          <div className="main-content-holder">
            <div className="content-grid-one">
              <CardFlip className="grid-c1" front={<Weather/>} back={<Weather/>} />
              <Wallet />
              <Report />
            </div>
            <div className="content-grid-two">
              <div className="grid-two-item">
                <div className="subgrid-two">
                  <Financial />
                  <Pomodoro />
                </div>
              </div>
              <Budget />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
