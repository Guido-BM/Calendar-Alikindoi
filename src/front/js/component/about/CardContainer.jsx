// CardContainer.js
import React, { Component } from "react";
import Card from "./Card";
import { bodyStyles, headerStyles } from "./CardStyles";


class CardContainer extends Component {
  render() {
    return (
      <div style={bodyStyles} className="body">
        <h1 style={headerStyles} className="header">
          Aliquindoi
        </h1>
        <div className="flex">
          <Card
            imgSrc="http://1.bp.blogspot.com/-tso_pF4jEdU/UPC4zDXEY6I/AAAAAAAAAhE/Vb2Cd8nRZEo/s1600/a.jpg"
            avatarSrc="https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/p-avatar-sam-worthington.jpg"
            cardBackImgSrc="https://i.pinimg.com/564x/1e/7e/4d/1e7e4d11c01e57f32410ece8c1961646.jpg"
            targetId="navi"
          />
          <Card
            type="wick"
            imgSrc="https://orig00.deviantart.net/db12/f/2012/038/5/0/blood_splatter_background_by_pudgey77-d4ozy89.jpg"
            avatarSrc="https://66.media.tumblr.com/3d3f6bb97ca2507b4aa679c205b7ae4d/tumblr_pitd3ejkzw1wcgykbo1_640.jpg"
            cardBackImgSrc="https://i.pinimg.com/736x/b1/2d/9f/b12d9f259a178fc9dc7bfb6447be7a1c.jpg"
          />
          <Card
            type="groot"
            imgSrc="https://wallpaperaccess.com/full/279729.jpg"
            avatarSrc="https://i.pinimg.com/originals/74/4d/b3/744db3fd9842133829be6e0182c3d62d.jpg"
            cardBackImgSrc="https://pre00.deviantart.net/0274/th/pre/i/2014/357/0/d/guardians_of_the_galaxy___groot_poster__acrylic__by_cybergal2013-d8aydlf.jpg"
          />
          <Card
            type="hitgirl"
            imgSrc="https://media.giphy.com/media/Y6pDMTysYTQ2I/giphy.gif"
            avatarSrc="https://66.media.tumblr.com/dcf6558ccad075ce4cca03cc1d972f97/tumblr_phhrt8PrRE1tc5gvpo4_250.png"
            cardBackImgSrc="https://i.pinimg.com/564x/22/f1/3e/22f13ea035bc11beeeb1349550fb3170.jpg"
          />
        </div>
      </div>
    );
  }
}

export default CardContainer;


