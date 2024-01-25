import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { Context } from "../../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.createUser(email, location, password, username);
  };
  const registrar = async () => {
    const response = await actions.createUser(
      email,
      location,
      password,
      username
    );
    if (response) {
      alert("Usuario creado");
      navigate("/home");
    } else {
      alert("Usuario no creado");
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="form">
          <h1 className="title">Registro</h1>
          <form onSubmit={handleSubmit}>
            <div className="inp">
              <input
                type="text"
                name="username"
                id="username"
                className="input-register"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="inp">
              <input
                type="text"
                name="location"
                id="location"
                className="input-register"
                placeholder="Ubicación"
                onChange={(e) => setLocation(e.target.value)}
              />
              <i className="fa-solid fa-map-marker"></i>
            </div>

            <div className="inp">
              <input
                type="email"
                name="email"
                id="email"
                className="input-register"
                placeholder="Correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="inp">
              <input
                type="password"
                name="password"
                id="password"
                className="input-register"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa-solid fa-lock"></i>
            </div>
            <button className="submit" onClick={registrar}>
              Registrarse
            </button>
            <p className="footer">
              ¿Ya tienes cuenta?{" "}
              <Link to="/" className="link">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
        <div></div>
        <div className="banner">
          <h1 className="wel_text">Bienvenid@</h1>
          <br />
          <p className="para"></p>
        </div>
      </div>
    </>
  );
};
