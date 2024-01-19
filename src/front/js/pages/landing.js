import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

function LandingPage() {
  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>

      <Link to="/login">
        <Button type="primary">Iniciar sesión</Button>
      </Link>
      <Link to="/signup">
        <Button type="primary">Registrar</Button>
      </Link>
    </div>
  );
}

export default LandingPage;
