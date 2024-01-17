import React from "react";
import { Link } from "react-router-dom";
import  Cards  from "../component/Cards/Cards";
import  Transactions  from "../component/Transactions/Transactions";
import  Report  from "../component/Report/Report";
import  Budget  from "../component/Budget/Budget";
import  Subscriptions  from "../component/Subscriptions/Subscriptions";
import  Savings  from "../component/Savings/Savings";
import  Loans  from "../component/Loans/Loans";
import  Financial  from "../component/Financial/Financial";

import "./home.scss";

export const Home = () => {
  

  return (
  <>
    <div className='home'>
    <div className='main-content'>
      <div className="main-content-holder">
        <div className="content-grid-one">
            <Cards />
            <Transactions />
            <Report />
        </div>
        <div className="content-grid-two">
            <Budget />
            <div className="grid-two-item">
              <div className="subgrid-two">
                <Subscriptions />
                <Savings />
              </div>
            </div>

            <div className="grid-two-item">
              <div className="subgrid-two">
                <Loans />
                <Financial />
              </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  </>)
};
