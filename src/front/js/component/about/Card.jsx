// Card.js
import React, { Component } from "react";
import CardImg from "./CardImg";
import CardAvatar from "./CardAvatar";
import CardTitle from "./CardTitle";
import CardBio from "./CardBio";
import CardSocialIcons from "./CardSocialIcons";
import CardBack from "./CardBack";
import "./Card.css";


import { cardContainerStyles } from "./CardStyles";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Maria García",
      subTitle: "@Elora Dana",
      bio: "Sick of doctors telling me what I couldn't do. I was a marine. A warrior... of the uh... Jarhead Clan. My cup is empty.",
      direction: "forwards",
    };
  }

  componentWillMount() {
    if (this.props.type === "wick") {
      this.setState({
        title: "Guido Muelas",
        subTitle: "@Guido",
        bio: "People keep asking if I'm back and I haven't really had an answer. But now, yeah, I'm thinkin' I'm back.",
      });
    } else if (this.props.type === "groot") {
      this.setState({
        title: "Paul Grozescu",
        subTitle: "@Paul",
        bio: "I am Groot. I am Groot... I am Groot, I am Groot, I am Groot I am Groot. I am Groot. I am Groot. I am Groot.",
      });
    } else if (this.props.type === "hitgirl") {
      this.setState({
        title: "Marta Mohedano",
        subTitle: "@Marta",
        bio: "I can't see through walls but I can kick your ass. I think some tasers look gay. Robin wishes he was me.",
      });
    }
  }

  render() {
    return (
      <div className="flipperContainer">
        <div className="flipper">
          <div style={cardContainerStyles} className="cardFront cardContainer">
            <CardImg imgSrc={this.props.imgSrc} />
            <CardAvatar avatarSrc={this.props.avatarSrc} />
            <CardTitle targetId={this.props.targetId} title={this.state.title} subTitle={this.state.subTitle} />
            <CardBio bio={this.state.bio} />
            <CardSocialIcons />
          </div>
          <CardBack />
        </div>
      </div>
    );
  }
}

export default Card;
