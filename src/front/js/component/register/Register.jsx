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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   actions.createUser(email, location, password, username);
  // };
  const registrar = async (event) => {
    event.preventDefault();
    const response = await actions.createUser(
      email,
      location,
      password,
      username
    );
    if (response) {
      alert("Usuario creado");
      navigate("/");
    } else {
      alert("Usuario no creado");
    }
  };

  return (
    <>
      <div className="wrapper-register">
        <div className="form-register">
          <h1 className="title-register">Registro</h1>
          <form>
            <div className="inp-register">
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
            <div className="inp-register">
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

            <div className="inp-register">
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
            <div className="inp-register">
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
            <button className="submit-register" onClick={registrar}>
              Registrarse
            </button>
            <p className="footer-register">
              ¿Ya tienes cuenta?{" "}
              <Link to="/" className="link-register">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
        <div></div>
        <div className="banner-register">
          <h1 className="wel_text-register">Bienvenid@</h1>
          <br />
          <p className="para-register"></p>
        </div>
      </div>
    </>
  );
};
