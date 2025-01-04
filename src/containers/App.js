import React, { useState, useEffect } from "react";
import axios from "axios";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");
  const POKEMON_API = "https://pokeapi.co/api/v2/";

  useEffect(() => {
    async function fetchData() {
      const pokemonList = await getPokemonList(); // Wait for the data
      setRobots(pokemonList); // Set robots to the fetched array
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

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !robots.length ? (
    <h1 className="tc">Loading...</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default App;
