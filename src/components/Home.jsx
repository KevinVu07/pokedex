import React, { useState, useEffect } from "react";
import PokemonList from "../components/PokemonList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import debounce from "lodash.debounce"; // Import debounce

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]); // To store filtered Pokémon objects
  const [allPokemonName, setAllPokemonName] = useState([]);
  const [searchfield, setSearchfield] = useState("");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const POKEMON_API = process.env.REACT_APP_POKEMON_API || "https://pokeapi.co/api/v2/";
  const pokemonsLimitPerPage = 151;

  // Fetch all Pokémon names for search
  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        const response = await fetch(`${POKEMON_API}pokemon?limit=1118`);
        const data = await response.json();
        // Extract only the names from the results and set them
        const pokemonNames = data.results.map((pokemon) => pokemon.name);
        setAllPokemonName(pokemonNames); // Set only the names
      } catch (error) {
        console.error("Error fetching all Pokémon names:", error);
      }
    };

    fetchAllPokemonNames();
  }, []);

  // Fetch initial Pokémon data (first 151 Pokémon)
  useEffect(() => {
    const fetchInitialPokemons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${POKEMON_API}pokemon?limit=${pokemonsLimitPerPage}&offset=${offset}`);
        const data = await response.json();
        setPokemonList(data.results); // Set first 151 Pokémon
      } catch (error) {
        console.error("Error fetching initial Pokémon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialPokemons();
  }, []); // Empty dependency array ensures it only runs on the first load

  // Fetch Pokémon data for lazy loading when user clicks "Load More"
  useEffect(() => {
    if (offset === 0) return; // Skip if it's the initial load
    const fetchMorePokemons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${POKEMON_API}pokemon?limit=${pokemonsLimitPerPage}&offset=${offset}`);
        const data = await response.json();
        setPokemonList((prevList) => [...prevList, ...data.results]);
        if (data.results.length < pokemonsLimitPerPage) {
          setHasMore(false); // No more data to fetch
        }
      } catch (error) {
        console.error("Error fetching more Pokémon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMorePokemons();
  }, [offset]); // Runs whenever the offset changes

  // Handle search field change and filter Pokémon data
  const onSearchChange = debounce(async (event) => {
    setSearchfield(event.target.value);

    if (event.target.value === "") {
      setFilteredPokemonList([]);
      return; // If search field is empty, reset the filtered list
    }

    const filteredNames = allPokemonName.filter((pokemonName) => pokemonName.toLowerCase().includes(event.target.value.toLowerCase()));

    // Fetch Pokémon data for filtered names
    const fetchedPokemons = await Promise.all(
      filteredNames.map(async (name) => {
        const response = await fetch(`${POKEMON_API}pokemon/${name}`);
        const data = await response.json();
        return data;
      })
    );

    setFilteredPokemonList(fetchedPokemons); // Set filtered Pokémon objects
  }, 500); // 500ms delay for debouncing

  const displayPokemons = searchfield ? filteredPokemonList : pokemonList;

  const loadMorePokemons = () => {
    setOffset((prevOffset) => prevOffset + pokemonsLimitPerPage);
  };

  return (
    <div className="tc">
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          {displayPokemons && displayPokemons.length > 0 ? <PokemonList pokemons={displayPokemons} /> : <h2>{searchfield ? "No Pokémon match your search!" : "Loading Pokémon..."}</h2>}
        </ErrorBoundary>
        {!searchfield && hasMore && (
          <button className="btn btn-outline-success mt-4 mb-4" onClick={loadMorePokemons} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More Pokémon"}
          </button>
        )}
      </Scroll>
    </div>
  );
}

export default Home;
