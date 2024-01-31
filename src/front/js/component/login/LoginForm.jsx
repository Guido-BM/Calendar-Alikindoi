import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const login = async () => {
    // console.log("credenciales", { email, password });
    const loginSuccessful = await actions.setToken(email, password);
    // console.log("loginSuccessful", loginSuccessful); // add this line
    if (loginSuccessful) {
      message.success("Welcome Back!");
      navigate("/");
    } else {
      message.error("Something went wrong!");
    }
  };
  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      {
        <div className="wrapper-login">
          <div className="wrapper-left">
            <h1 className="title-login">Inicio</h1>
            <div className="inp-login">
              <input
                type="text"
                id="email"
                className="input-login"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <i className="fa-solid fa-user"></i>
            </div>

            <div className="inp-login">
              <input
                type="password"
                id="password"
                className="input-login"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <i className="fa-solid fa-lock"></i>
            </div>

            <button className="submit-login" onClick={login}>
              Iniciar sesión
            </button>
            <p className="footer-login">
              ¿No tienes cuenta?{" "}
              <Link to="/signup" className="link-login">
                Por favor, Registrate
              </Link>
            </p>
          </div>
          <div></div>

          <div className="banner-login">
            <h1 className="wel_text-login">Bienvenid@</h1>
            <br />
            {/* <p className="para-login"></p> */}
          </div>
        </div>
      }
    </>
  );
};
