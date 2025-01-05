import React from "react";
import PokemonCard from "./PokemonCard.js";
import { Link } from "react-router-dom";

function PokemonList(props) {
  const pokemonArrays = props.pokemons.map((pokemon) => {
    return (
      <Link key={pokemon.name} to={`/${pokemon.name}`}>
        <PokemonCard name={pokemon.name} />
      </Link>
    );
  });
  return <div>{pokemonArrays}</div>;
}

export default PokemonList;
