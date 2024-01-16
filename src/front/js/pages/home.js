import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar";
import {Content} from "../layout/Content/Content";
import "./home.scss";

export const Home = () => {
  

  return (
  <>
    <div className='home'>
      {/* <Sidebar /> */}
      <Content />
    </div>
  </>)
};
