import React, { useContext, useEffect } from "react";
import Cards from "../component/Cards/Cards";
import Todoist from "../component/Todoist/Todoist";
import Budget from "../component/Budget/Budget";
import Wallet from "../component/Subscriptions/Wallet";
import Pomodoro from "../component/Pomodoro/Pomodoro";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


import "./home.scss";
import CardFlip from "../component/Cards/CardFlip";
import { Weather } from "../component/weather/Weather";
import { WeatherBack } from "../component/weather/WeatherBack";

export const Home = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    let urlObj = new URL(url);
    let token = urlObj.searchParams.get("accessToken");
    if (token) {
      localStorage.setItem('tokenTodoist', token);
      actions.setTokenTodoist(token)
      // navigate("/home");
      console.log(token);
    }
  }, []);

  return (
    <>
      <div className="home" style={{ height: "100vh" }}>
        <div className="main-content">
          <div className="main-content-holder">
            <div className="content-grid-one">
              <CardFlip front={<Weather />} back={<WeatherBack />} />
              {/* <Cards /> */}
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
