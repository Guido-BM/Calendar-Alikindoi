import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;

const Cell = styled.div`
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload?.desc}</span>
      <span>${props.payload?.amount}</span>
      <div>
        <button onClick={() => props.onEdit(props.payload.id)}>Edit</button>
        <button onClick={() => props.onDelete(props.payload.id)}>Delete</button>
      </div>
    </Cell>
  );
};

const TransactionsComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let filteredTransactions = [...props.transactions];
    filteredTransactions = filteredTransactions.filter((payload) =>
      payload.desc && payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(filteredTransactions);
  };

  useEffect(() => {
    filterData(searchText);
  }, [searchText, props.transactions]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction?.map((payload) => (
        <TransactionCell
          key={payload.id}
          payload={payload}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ))}
    </Container>
  );
};

export default TransactionsComponent;



