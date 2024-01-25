import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <div className="wrapper-register">
        <div className="form-register">
          <h1 className="title-register">Registro</h1>
          <div className="inp-register">
            <input
              type="text"
              name="username"
              id="username"
              className="input-register"
              placeholder="Usuario"
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
            />
            <i className="fa-solid fa-lock"></i>
          </div>
          <button className="submit-register">Registrarse</button>
          <p className="footer-register">
            ¿Ya tienes cuenta?{" "}
            <Link to="/" className="link-register">
              Inicia sesión
            </Link>
          </p>
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
