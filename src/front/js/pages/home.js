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
import { message } from "antd";
import CardWallet from "../component/Cards/CardWallet";

export const Home = () => {
  const { actions, store } = useContext(Context);
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

  const mapperForTransactions = (transactions) => {
    if (!Array.isArray(transactions)) return [];
    else
      return transactions.map((transaction) => {
        return {
          id: transaction.id,
          description: transaction.description,
          amount: transaction.amount,
          date: new Date(transaction.date),
          category: transaction.category,
          type: transaction.amount > 0 ? "income" : "expense",
        };
      });
  };

  const deleteTransaction = async (id) => {
    try {
      const res = await fetch(process.env.BACKEND_URL + `/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`,
        },
      });

      if (res.ok) {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== id
        );
        setTransactions(updatedTransactions);
        message.success("Successfully removed");
      } else {
        message.error("Failed to remove");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred");
    }
  };
  const getTransactions = async () => {
    const res = await fetch(
      process.env.BACKEND_URL + `/api/expenses/user/${store.user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`,
        },
      }
    );
    const data = await res.json();
    setTransactions(mapperForTransactions(data));
  };

  useEffect(() => {
    getTransactions();
  }, [store.user]);

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
              <CardWallet
                front={
                  <Wallet
                    transactions={transactions}
                    setTransactions={setTransactions}
                    deleteTransaction={deleteTransaction}
                    getTransactions={getTransactions}
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
