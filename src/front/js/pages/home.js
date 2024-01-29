import React, { useContext, useEffect, useState } from "react";
import Cards from "../component/Cards/Cards";
import Todoist from "../component/Todoist/Todoist";
import Wallet from "../component/Subscriptions/Wallet";
import WalletBack from "../component/Subscriptions/WalletBack";
import Pomodoro from "../component/Pomodoro/Pomodoro";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


import "./home.scss";
import CardFlip from "../component/Cards/CardFlip";
import { Weather } from "../component/weather/Weather";
import { WeatherBack } from "../component/weather/WeatherBack";
import AliquindoiCalendar from "../component/AliquindoiCalendar/AliquindoiCalendar";
import { message } from 'antd';

export const Home = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    let urlObj = new URL(url);
    let token = urlObj.searchParams.get("accessToken");
    if (token) {
      actions.setTokenTodoist(token);
      // navigate("/home");
      // console.log(token);
    }
  }, []);

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
    message.success('Successfully removed');
  };


  return (
    <>
      <div className="home" style={{ height: "100vh" }}>
        <FloatButton
          onClick={actions.logOut}
          style={{ position: "fixed", top: "10px", right: "10px" }}
          icon={<LogoutOutlined />}
        >
          Log Out
        </FloatButton>

        <div className="main-content">
          <div className="main-content-holder">
            <div className="content-grid-one">
              <CardFlip front={<Weather />} back={<WeatherBack />} />
              {/* <Cards /> */}
              <CardFlip
                front={
                  <Wallet
                    transactions={transactions}
                    setTransactions={setTransactions}
                    deleteTransaction={deleteTransaction}
                  />
                }
                back={
                  <WalletBack
                    transactions={transactions}
                    deleteTransaction={deleteTransaction}
                  />
                }
              />
              <Pomodoro />
            </div>
            <div className="content-grid-two">
              <div className="grid-two-item">
                <div className="subgrid-two">
                  <Todoist />
                </div>
              </div>
              <AliquindoiCalendar />
              <Link to="/about">
                <FloatButton
                  style={{ position: "fixed", bottom: "10px", right: "10px" }}
                  icon={<TeamOutlined />}
                >
                  About us
                </FloatButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
