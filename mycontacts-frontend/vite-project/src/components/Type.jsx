import React from "react";

function Type(props) {
  const typeColors = {
    normal: 'gray',
    fire: 'orangered',
    water: 'lightblue',
    grass: 'green',
    fighting: 'red',
    flying: 'skyblue',
    poison: 'rgb(210, 20, 102)', // MAKE ALL LIKE THIS ONLY
    ground: 'saddlebrown',
    rock: 'sienna',
    bug: 'green',
    ghost: 'indigo',
    steel: 'slategray',
    electric: 'yellow',
    psychic: 'lightpink',
    ice: 'lightcyan',
    dragon: 'darkslateblue',
    dark: 'darkslategray',
    fairy: 'pink'
};
  let type;
  if(props.data)
  {
    type = props.data.types;
    type.forEach(element => {
      console.log(element["type"]["name"]);
    });
  }
  else{
    type = "No Pokemon"
  }
  let typeButtons;
  if (props.data && props.data.types && props.exists) {
    typeButtons = props.data.types.map((element, index) => {
      const typeName = element.type.name;
      const backgroundColor = typeColors[typeName] || 'gray'; // Default to 'gray' if type not found

      return (
        <button
          key={index}
          style={{ backgroundColor, color: 'black', margin: '5px', border: 'none', padding: '10px', borderRadius: '5px' }}
        >
          {typeName}
        </button>
      );
    });
  } else {
    typeButtons = <p>No Pokemon Found</p>;
  }

return (
<div>{typeButtons}</div>
  );
}

export default Type;
