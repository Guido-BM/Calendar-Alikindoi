import React from "react";
import { LoginForm } from "../component/login/LoginForm";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          libero vel nunc finibus ullamcorper. Nullam euismod, nisl vitae
          aliquam ultricies, elit elit tincidunt massa, in ullamcorper nunc
          velit non lorem. Vivamus nec magna eget ex ultricies lacinia. In hac
          habitasse platea dictumst.
        </p>
        <div className="Home">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
