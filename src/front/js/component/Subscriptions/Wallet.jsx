import React, { useState, useContext, useEffect } from "react";
import "./Wallet.css";
import { Modal, Button, message } from "antd";
import WalletBack from "./WalletBack";
import { Context } from "../../store/appContext";

const Wallet = ({ transactions, setTransactions, getTransactions }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const { store, actions } = useContext(Context);

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

  const setFormData = (transaction) => {
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setType(transaction.type);
  };

  const addTransaction = async (e, transaction) => {
    e.preventDefault();
    if (!amount || !description || !type) {
      message.error("Please fill all the fields and select a type");
      return;
    }
  
    setFormData({
      amount: "",
      description: "",
      type: null,
    });
    setType(null);
    const res = await fetch(
      process.env.BACKEND_URL + `/api/users/${store.user}/expenses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`,
        },
        body: JSON.stringify({
          amount: type === "expense" ? -amount : amount,
          date: new Date().toISOString().split("T")[0],
          description: description,
          user_id: store.user,
        }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      getTransactions();
      message.success('Transaction created');
    } else {
      console.error("Error adding transaction:", data);
    }
  };

  // useEffect(() => {
  //   getTransactions();
  // }, [addTransaction]);

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
    .filter((transaction) => {
      console.log(transaction);
      return transaction.type === "income";
    })
    .reduce((acc, transaction) => acc + +transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + +transaction.amount, 0);

  const difference = totalIncome + totalExpense;

  return (
    <>
      <div className="container-wallet">
        <Button
          id="buttoncitolindomio"
          className="add-button"
          type="primary"
          onClick={showModal}
        >
          ADD TRANSACTION
        </Button>
        <Modal
          title="Transaction"
          open={visible}
          onOk={editMode !== null ? saveEditedTransaction : addTransaction}
          onCancel={handleCancel}
        >
          <form
            onSubmit={
              editMode !== null ? saveEditedTransaction : addTransaction
            }
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
                className={`button expense ${
                  type === "expense" ? "active" : ""
                }`}
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
