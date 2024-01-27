// WalletBack.jsx
import React from "react";

const WalletBack = ({ transactions, editTransaction, deleteTransaction }) => {
  return (
    <div className="transactionList">
      {transactions && transactions.map((transaction) => (
        <div className="transactionItem" key={transaction.id}>
          <div>{transaction.description}</div>
          <div>${transaction.amount}</div>
          <div>{transaction.type === "expense" ? "Expense" : "Income"}</div>
          <div>
            <button onClick={() => editTransaction(transaction.id)}>
              Edit
            </button>
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
