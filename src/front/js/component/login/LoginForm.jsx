import React from 'react';
import './LoginForm.css';

export const LoginForm = () => {
  return (
    <>
      <div className="wrapper">
        <form action="" className="form">
          <h1 className="title">Inicio</h1>
          <div className="inp">
            <input type="text" name="" id="" className="input" placeholder="usuario" />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="inp">
            <input type="password" name="" id="" className="input" placeholder="contraseña" />
            <i className="fa-solid fa-lock"></i>
          </div>
          <button className="submit">Iniciar sesión</button>
          <p className="footer">
            ¿No tienes cuenta? <a href="#" className="link">Por favor, Registrate</a>
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
