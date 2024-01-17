import React from "react";
import "./Transactions.css";
import { transactions } from "../../data/data";
import { iconsImgs } from "../../utils/images";
import Fotito from "../../assets/icons/plus.svg";
const Transactions = () => {
  return (
    <div className="grid-one-item grid-common grid-c2">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">All Transactions</h3>
        <button className="grid-c-title-icon">
          <img src={`${iconsImgs.plus}`} />
          <img src={Fotito} alt="Fotito" />
        </button>
      </div>

      <div className="grid-content">
        <div className="grid-items">
          {transactions.map((transaction) => (
            <div className="grid-item" key={transaction.id}>
              <div className="grid-item-l">
                <div className="avatar img-fit-cover">
                  <img src={transaction.image} alt="" />
                </div>
                <p className="text">
                  {transaction.name} <span>{transaction.date}</span>
                </p>
              </div>
              <div className="grid-item-r">
                <span className="text-scarlet">$ {transaction.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
