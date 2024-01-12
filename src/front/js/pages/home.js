import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import rigoImageUrl from "../../img/rigo-baby.jpg";



export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container">
        <h1>Signup</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          libero vel nunc finibus ullamcorper. Nullam euismod, nisl vitae
          aliquam ultricies, elit elit tincidunt massa, in ullamcorper nunc
          velit non lorem. Vivamus nec magna eget ex ultricies lacinia. In hac
          habitasse platea dictumst.
        </p>
      </div>
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </>
  );
};
