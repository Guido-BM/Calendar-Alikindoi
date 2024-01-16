import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { LoginForm } from "../component/login/LoginForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token) {
      navigate("/home");
    }
  }, [store.token]);

  return (
    <>
      <div className="Home">{store.token ? null : <LoginForm />}</div>;
    </>
  );
};
