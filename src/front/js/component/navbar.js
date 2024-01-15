import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/about">
          <span className="navbar-brand mb-0 h1">About</span>
        </Link>

        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-primary">Signup</button>
        </Link>
      </div>
    </nav>
  );
};
