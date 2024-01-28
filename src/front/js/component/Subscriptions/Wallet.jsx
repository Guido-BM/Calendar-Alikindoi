import React, { useState } from "react";
import "./Wallet.css"; // Importa los estilos desde Wallet.css
import { Modal, Button } from "antd";
import WalletBack from "./WalletBack";

const Wallet = ({ transactions, setTransactions }) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [editMode, setEditMode] = useState(null);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  const addTransaction = (e) => {
    e.preventDefault();
    if (!amount || !description) return;
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      description: description,
      type: type,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
    setType("expense");
  };
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };
  const editTransaction = (id) => {
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === id
    );
    setEditMode(id);
    setAmount(transactionToEdit.amount);
    setDescription(transactionToEdit.description);
    setType(transactionToEdit.type);
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
    setType("expense");
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
          open={visible}
          onOk={editMode !== null ? saveEditedTransaction : addTransaction} // Cambia la función onOk del modal
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
            />
            <div>
              <label>
                <input
                  name="type"
                  type="radio"
                  value="expense"
                  checked={type === "expense"}
                  onChange={() => setType("expense")}
                />
                Expense
              </label>
              <label>
                <input
                  name="type"
                  type="radio"
                  value="income"
                  checked={type === "income"}
                  onChange={() => setType("income")}
                />
                Income
              </label>
            </div>
            {/* Elimina el botón "Add Transaction" del formulario */}
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
