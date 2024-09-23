import React from "react";
import Card from "./Card.jsx"
function Body(props) {
  const year = new Date().getFullYear();
  // console.log(props.pokemonData);
  return (
    <div className="Card">
      <Card pokemonName={props.pokemonName} pokemonData={props.pokemonData}/>
    </div>
  );
}

export default Body;
