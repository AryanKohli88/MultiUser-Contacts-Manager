import { useState } from 'react'

import TopBar from './components/TopBar.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import Body from './components/Body.jsx'

import axios from "axios"

const getInfo = async (ip)=>{
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ip}`);
  return response;
}

function App() {
  let response;
  const [pokemonName, setpokemonName] = useState('') // whenever that variable is called outside its setfunction, the setfunction is run first to update the value 
  const [pokemonData, setPokemonData] = useState(null)

  const getPokemon = async (event) => {

    event.preventDefault();
    const form = event.target.closest('form');
    
    const name = form.querySelector('input[name="pokemon"]').value.toLowerCase();
    setpokemonName(name)

    try{
      const response = await getInfo(name);
      setPokemonData(response.data);
      // console.log(response.data.id);
    }
    catch(err){
      setPokemonData(null);
      console.error(`Error :: ${err}`);
    }
  }

  return <div>
    <TopBar />
    <SearchBar getPokemon={getPokemon} />
    <Body pokemonName={pokemonName} pokemonData={pokemonData}/> 
    <Footer />
  </div>
}

export default App
