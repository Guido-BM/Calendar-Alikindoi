import React from "react";
import "./Content.css";
import {ContentTop} from '../../component/home/ContentTop/ContentTop.jsx';
import {ContentMain} from '../../component/home/ContentMain/ContentMain';

export const Content = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <ContentMain />
    </div>
  )
}

