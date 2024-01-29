import React, { useState } from "react";
import "./Wallet.css";
import { Modal, Button, message } from "antd";
import WalletBack from "./WalletBack";

const Wallet = ({ transactions, setTransactions }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setAmount("");
    setDescription("");
    setType(null);
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (!amount || !description) {
      message.error("Description and amount are required");
      return;
    }
    if (!type) {
      message.error("Please select a type (income or expense)");
      return;
    }
    if (parseFloat(amount) < 0) {
      message.error("It is not possible to enter negative numbers");
      return;
    }
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      description: description,
      type: type,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
    setType(null);
    message.success("Added successfully, to exit press 'X' or 'ESC'");
  };

  const saveEditedTransaction = (e) => {
    e.preventDefault();
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editMode
        ? {
            ...transaction,
            amount: parseFloat(amount),
            description: description,
            type: type,
          }
        : transaction
    );
    setTransactions(updatedTransactions);
    setEditMode(null);
    setAmount("");
    setDescription("");
    setType(null);
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const difference = totalIncome - totalExpense;

  return (
    <>
      <div className="container-wallet">
        <Button className="add-button" type="primary" onClick={showModal}>
          ADD TRANSACTION
        </Button>
        <Modal
          title="Transaction"
          visible={visible}
          onOk={editMode !== null ? saveEditedTransaction : addTransaction}
          onCancel={handleCancel}
        >
          <form
            onSubmit={editMode !== null ? saveEditedTransaction : addTransaction}
            className="transactionForm"
          >
            <input
              className="transactionInput"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="transactionInput"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
            />
            <div>
              <Button
                className={`button expense ${type === "expense" ? "active" : ""}`}
                onClick={() => setType("expense")}
              >
                Expense
              </Button>
              <Button
                className={`button income ${type === "income" ? "active" : ""}`}
                onClick={() => setType("income")}
              >
                Income
              </Button>
            </div>
          </form>
        </Modal>
        <div className="totals-container">
          <h3>Total Income: €{totalIncome.toFixed(2)}</h3>
          <br />
          <h3>Total Expense: €{totalExpense.toFixed(2)}</h3>
          <br />
          <h3
            className={`difference ${
              difference > 0 ? "positive" : difference < 0 ? "negative" : "zero"
            }`}
          >
            Difference: €{difference.toFixed(2)}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Wallet;
