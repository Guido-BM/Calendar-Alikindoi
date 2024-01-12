import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <>
      <div className="wrapper">
        <form action="" className="form">
          <h1 className="title">Registro</h1>
          <div className="inp">
            <input type="text" name="username" id="username" className="input" placeholder="Usuario" />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="inp">
            <input type="text" name="location" id="location" className="input" placeholder="Ubicación" />
            <i className="fa-solid fa-map-marker"></i>
          </div>
          <div className="inp">
            <input type="text" name="birth_date" id="birth_date" className="input" placeholder="Fecha de nacimiento" />
            <i className="fa-solid fa-calendar"></i>
          </div>
          <div className="inp">
            <input type="email" name="email" id="email" className="input" placeholder="Correo electrónico" />
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="inp">
            <input type="password" name="password" id="password" className="input" placeholder="Contraseña" />
            <i className="fa-solid fa-lock"></i>
          </div>
          <button className="submit">Registrarse</button>
          <p className="footer">
          ¿Ya tienes cuenta? <Link to="/" className="link">Inicia sesión</Link>
          </p>

        </form>
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
