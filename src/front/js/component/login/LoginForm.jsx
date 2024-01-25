import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";

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
      navigate("/home");
    } else {
      setErrorMessage("Credenciales incorrectas");
    }
  };
  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      {
        <div className="wrapper">
          <div>
            <h1 className="title">Inicio</h1>
            <div className="inp">
              <input
                type="text"
                id="email"
                className="input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="inp">
              <input
                type="password"
                id="password"
                className="input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <i className="fa-solid fa-lock"></i>
            </div>
            <button className="submit" onClick={login}>
              Iniciar sesión
            </button>
            <p className="footer">
              ¿No tienes cuenta?{" "}
              <Link to="/signup" className="link">
                Por favor, Registrate
              </Link>
            </p>
          </div>
          <div></div>
          <div className="banner">
            <h1 className="wel_text">Bienvenid@</h1>
            <br />
            <p className="para"></p>
          </div>
        </div>
      }
    </>
  );
};
