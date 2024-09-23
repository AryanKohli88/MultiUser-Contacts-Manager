import React from "react";

// dotenv.config()

function Animation(props) {

  async function getPokemonGif(pokemonName) {
    const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY;
    console.log({giphyApiKey});
    // Search for the Pokémon GIF on Giphy
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${pokemonName} meme &limit=1`);
    const data = await response.json();
  
    if (data.data.length > 0) {
      // Return the URL of the first GIF found
      console.log(data.data[0].images.original.url)
      return data.data[0].images.original.url;
    } else {
      return 'No GIF found for this Pokémon.';
    }
  }
  
  return (
    <div>
      {/* <img src={getPokemonGif(props.pok_name)} alt="GIPHY" /> */}
      <img src={getPokemonGif(props.pok_name)} width="270" height='auto' allowFullScreen />
    </div>
  );
}

export default Animation;
