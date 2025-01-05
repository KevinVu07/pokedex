import React from "react";
import Card from "./Card.js";

function CardList(props) {
  const cardArrays = props.pokemons.map((pokemon, i) => {
    return <Card key={i + 1} id={i + 1} name={props.pokemons[i].name} url={props.pokemons[i].url} />;
  });
  return <div>{cardArrays}</div>;
}

export default CardList;
