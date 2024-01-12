import React from "react";
import { LoginForm } from "../component/login/LoginForm";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <div className="Home">
        <LoginForm />
      </div>
    </>
  );
};
