// WalletBack.jsx
import React from "react";
import "./Wallet.css";

const WalletBack = ({ transactions, deleteTransaction }) => {
  return (
    <div className="transactionList">
      {transactions &&
        transactions.map((transaction) => (
          <div className="transactionItem" key={transaction.id}>
            <div className="transaction-description">
              {transaction.description}
            </div>
            <div className="transaction-amount">${transaction.amount}</div>
            <div
              className={`transaction-type ${transaction.type.toLowerCase()}`}
            >
              {transaction.type === "expense" ? "Expense" : "Income"}
            </div>
            <div>
              {/* <button onClick={() => editTransaction(transaction.id)}>
              Edit
            </button> */}
              <button onClick={() => deleteTransaction(transaction.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WalletBack;
