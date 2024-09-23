import React from "react";
import {useNavigate} from 'react-router-dom';
function SearchBar(props) {
  const year = new Date().getFullYear();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div>
        <p className="searchLabel">Search for a Pokemon</p>
        <form action="/submit" method="POST" className="form" id="pokemonForm"> 
         <label>Name: </label>
        <input placeholder="Name of the pokemon..." type="text" name="pokemon" className="text-box" required/>
        <input type="submit" className="btn" onClick={props.getPokemon}  required/>
    </form>
        <button name="login" className="login-btn" onClick={handleClick}> Login </button>
    </div>
  );
}

export default SearchBar;