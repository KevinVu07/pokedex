import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import Heading from "../components/Heading";
import PokemonDetail from "../components/PokemonDetail";

function App() {
  return (
    <Router>
      <div className="bg-light">
        <Link to="/">
          <Heading />
        </Link>
        <Routes>
          <Route path="/pokedex" element={<Home />} />
          <Route path="/:name" element={<PokemonDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
