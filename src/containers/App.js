import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchfield, setSearchfield] = useState("");
  const POKEMON_API = "https://pokeapi.co/api/v2/";

  useEffect(() => {
    async function fetchData() {
      const pokemons = await getPokemonList(); // Wait for the data
      console.log(pokemons);
      setPokemonList(pokemons); // Set pokemons to the fetched array
    }
    fetchData();
  }, []); // Empty dependency array to prevent infinite loop

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
      <h1 className="f1">POKEDEX</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList pokemons={filteredPokemons} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default App;
