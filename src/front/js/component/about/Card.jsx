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
      title: "María García",
      subTitle: "eloradana1983@gmail.com",
      bio: "Desde que comencé a explorar el mundo de la programación, me fascinó la forma en que se puede crear y dar vida a ideas a través del código.",
      direction: "forwards",
    };
  }

  componentWillMount() {
    if (this.props.type === "wick") {
      this.setState({
        title: "Guido Muelas",
        subTitle: "guidoboninomuelas@gmail.com",
        bio: "People keep asking if I'm back and I haven't really had an answer. But now, yeah, I'm thinkin' I'm back.",
      });
    } else if (this.props.type === "groot") {
      this.setState({
        title: "Paul Grozescu",
        subTitle: "paulgrozescu@gmail.com",
        bio: "I am Groot. I am Groot... I am Groot, I am Groot, I am Groot I am Groot. I am Groot. I am Groot. I am Groot.",
      });
    } else if (this.props.type === "hitgirl") {
      this.setState({
        title: "Marta Mohedano",
        subTitle: "marta.mohedano@gmail.com",
        bio: "Desarrolladora apasionada y comprometida con crear soluciones que impacten positivamente en la sociedad.",
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
            <CardSocialIcons
              githubUrl={this.props.githubUrl}
              linkedinUrl={this.props.linkedinUrl}
              email={this.props.email}
            />
          </div>
          <CardBack />
        </div>
      </div>
    );
  }
}

export default Card;
