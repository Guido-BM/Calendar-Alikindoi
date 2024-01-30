// WalletBack.jsx
import React from "react";
import "./Wallet.css";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WalletBack = ({ transactions, deleteTransaction }) => {
  return (
    <div className="transactionList">
      {transactions &&
        transactions.map((transaction) => (
          <div className="transactionItem" key={transaction.id}>
            <div className="transaction-description">
              {transaction.description}
            </div>
            <div className="transaction-amount">
              €{Math.floor(transaction.amount * 100) / 100}
            </div>
            <div className={`transaction-type ${transaction.type}`}>
              {transaction.type}
            </div>
            <div>
              <button
                className="delete-button"
                id="trash-button"
                onClick={() => deleteTransaction(transaction.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WalletBack;
