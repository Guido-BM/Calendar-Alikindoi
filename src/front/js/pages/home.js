import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import rigoImageUrl from "../../img/rigo-baby.jpg";
import { LoginForm } from "../component/login/LoginForm";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="Home">
      <LoginForm />
    </div>
  );
};
