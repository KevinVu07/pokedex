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

  const { sprites, types, height, weight, abilities, stats } = pokemonData;
  const officialArtwork = sprites?.other?.["official-artwork"]?.front_default;

  return (
    <div className="container mt-5">
      <div className="pokemon-header text-center mb-4">
        <h1 className="pokemonNameDetail">
          {name[0].toUpperCase() + name.slice(1)} #{pokemonData.id}
        </h1>
      </div>
      <div className="row">
        <div className="col-md-6 text-center">
          <img src={officialArtwork} alt={name} className="img-fluid" />
        </div>
        <div className="col-md-6 text-center">
          <div className="pokemon-info mb-3">
            <p>
              <strong>Height:</strong> {height}
            </p>
            <p>
              <strong>Weight:</strong> {weight} lbs
            </p>
            <p>
              <strong>Abilities:</strong> {abilities.map((a) => a.ability.name).join(", ")}
            </p>
          </div>
          <div className="pokemon-types mb-3">
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
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
