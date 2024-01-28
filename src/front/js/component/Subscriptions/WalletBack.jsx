// WalletBack.jsx
import React from "react";
import "./Wallet.css";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const WalletBack = ({ transactions, deleteTransaction, editTransaction }) => {
  return (
    <div className="transactionList">
      {transactions &&
        transactions.map((transaction) => (
          <div className="transactionItem" key={transaction.id}>
            <div className="transaction-description">
              {transaction.description}
            </div>
            <div className="transaction-amount">€{transaction.amount}</div>
            <div
              className={`transaction-type ${transaction.type.toLowerCase()}`}
            >
              {transaction.type === "expense" ? "Expense" : "Income"}
            </div>
            <div>
              <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WalletBack;
