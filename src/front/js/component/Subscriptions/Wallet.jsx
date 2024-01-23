import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OverViewComponent from "./overViewComponent";
import TransactionsComponent from "./transactionsComponent.jsx";
import CardFlip from "../Cards/CardFlip.jsx";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px; // Añade un borde redondeado como en weather.jsx
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); // Añade una sombra de caja como en weather.jsx
`;

const Wallet = (props) => {
  const [transactions, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) =>
      payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount)
    );
    updateExpense(exp);
    updateIncome(inc);
  };
  useEffect(() => calculateBalance(), [transactions]);

  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    updateTransaction(transactionArray);
  };
  return (
    <Container>
      <CardFlip
        front={
          <OverViewComponent
            expense={expense}
            income={income}
            addTransaction={addTransaction}
          />
        }
        back={
          transactions?.length ? (
            <TransactionsComponent transactions={transactions} />
          ) : (
            ""
          )
        }
      />
    </Container>
  );
};
export default Wallet;
