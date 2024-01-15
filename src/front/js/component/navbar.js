import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/about">
          <span className="navbar-brand mb-0 h1">-About-</span>
        </Link>

        <Link to="/login">
          <span className="navbar-brand mb-0 h1">-Login-</span>
        </Link>

        <Link to="/signup">
          <span className="navbar-brand mb-0 h1">-Signup-</span>
        </Link>
      </div>
    </nav>
  );
};
