import React from "react";
import Cards from "../component/Cards/Cards";
<<<<<<< Updated upstream
import Report from "../component/Report/Report";
=======
import Transactions from "../component/Transactions/Transactions";
import Todoist from "../component/Todoist/Todoist";
>>>>>>> Stashed changes
import Budget from "../component/Budget/Budget";
import Wallet from "../component/Subscriptions/Wallet";
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
              <Todoist />
            </div>
            <div className="content-grid-two">
              <div className="grid-two-item">
                <div className="subgrid-two">
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
