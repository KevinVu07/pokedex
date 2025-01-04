import React from "react";
import Card from "./Card.js";

function CardList(props) {
  const cardArrays = props.robots.map((user, i) => {
    return <Card key={i} id={props.robots[i].id} name={props.robots[i].name} email={props.robots[i].email} />;
  });
  return <div>{cardArrays}</div>;
}

export default CardList;
