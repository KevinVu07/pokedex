import React, { useState, useEffect } from "react";

function Card(props) {
  const POKEMON_API = "https://pokeapi.co/api/v2/";
  const [pokemonImg, setPokemonImg] = useState("");

  useEffect(() => {
    async function getPokemonImg() {
      const response = await fetch(`${POKEMON_API}pokemon/${props.id}`);
      const data = await response.json();
      setPokemonImg(data?.sprites?.other?.["official-artwork"]?.front_default);
    }

    getPokemonImg();
  }, [props.id]); // Dependency array ensures the effect runs when `props.id` changes

  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      {pokemonImg ? <img className="pokemonImg" src={pokemonImg} alt="pokemon" /> : <p>Loading...</p>}
      <div>
        <h2>{props.name}</h2>
        <p>{props.url}</p>
      </div>
    </div>
  );
}

export default Card;
