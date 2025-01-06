import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import Heading from "../components/Heading";
import PokemonDetail from "../components/PokemonDetail";

function App() {
  return (
    <Router basename="/pokedex">
      <div className="bg-light">
        <Link className="link" to={`${process.env.PUBLIC_URL}/`}>
          <Heading />
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<PokemonDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
