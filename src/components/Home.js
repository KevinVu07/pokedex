import React, { useState, useEffect } from "react";
import PokemonList from "../components/PokemonList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import TextToSpeech from "./TextToSpeech";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchfield, setSearchfield] = useState("");
  const POKEMON_API = process.env.REACT_APP_POKEMON_API || "https://pokeapi.co/api/v2/";

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemons = await getPokemonList();
        setPokemonList(pokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }
    fetchData();
  }, []);

  function onSearchChange(event) {
    setSearchfield(event.target.value);
  }

  async function getPokemonList() {
    const response = await fetch(POKEMON_API + "pokemon?limit=151&offset=0");
    const data = await response.json();
    return data.results;
  }

  const filteredPokemons = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !pokemonList.length ? (
    <h1 className="tc">Loading...</h1>
  ) : (
    <div className="tc">
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>{filteredPokemons.length ? <PokemonList pokemons={filteredPokemons} /> : <h2>No Pokémon match your search!</h2>}</ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default Home;
