import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PokemonDetail({ id }) {
  const { name } = useParams(); // Extract the Pokémon name from the URL
  const POKEMON_API = "https://pokeapi.co/api/v2/";
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function fetchPokemonData() {
      const response = await fetch(`${POKEMON_API}pokemon/${name}`);
      const data = await response.json();
      setPokemonData(data);
    }

    fetchPokemonData();
  }, [name]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  const typeColors = {
    Grass: "green",
    Poison: "purple",
    Fire: "orange",
    Water: "blue",
    Ground: "brown",
    Rock: "gray",
    // Add other types as needed
  };

  const { pokemonName, sprites, types, height, weight, abilities, stats } = pokemonData;
  const officialArtwork = sprites?.other?.["official-artwork"]?.front_default;

  return (
    <div className="pokemon-detail-container">
      <div className="pokemon-header">
        <h1>
          {pokemonName} #{id}
        </h1>
      </div>
      <div className="pokemon-body">
        <img src={officialArtwork} alt={pokemonName} />
        <div className="pokemon-info">
          <p>Height: {height}</p>
          <p>Weight: {weight} lbs</p>
          <p>Abilities: {abilities.map((a) => a.ability.name).join(", ")}</p>
        </div>
        <div className="pokemon-types">
          <h3>Type</h3>
          {types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              style={{
                backgroundColor: typeColors[typeInfo.type.name],
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                margin: "0 5px",
              }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        <div className="pokemon-stats">
          <h3>Stats</h3>
          <ul>
            {stats.map((statInfo) => (
              <li key={statInfo.stat.name}>
                {statInfo.stat.name}: {statInfo.base_stat}
              </li>
            ))}
          </ul>
        </div>
        {/* Add weaknesses and evolution details as needed */}
      </div>
    </div>
  );
}

export default PokemonDetail;
