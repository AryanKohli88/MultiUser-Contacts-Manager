import React from "react";
import Image from "./Image.jsx"
import Type from "./Type.jsx"
import FoundInGames from "./FoundInGames.jsx"
import Animation from "./Animation.jsx"
import Evolution from "./Evolution.jsx"
import KnowMore from "./KnowMore.jsx"
function Card(props){
    let exists = false;
    const data = props.pokemonData;
    let id = -1;
    if(data)
    {
        console.log(data.id);
        id = data.id;
        exists = true;
    }
    else
    console.log("No data")
    
    return <div>
        
        <div className="up">
            <div className="left">
                <Image id={id} exists={exists}/> 
                <Type data={data} exists={exists}/>
            </div>
            <div className="right">
                <b>List of Games:</b>
                <FoundInGames data={data} exists={exists}/>
            </div>
            {/* <div className="right-animation">
                <Animation pok_name={props.pokemonName} exists={exists}/>
            </div> */}
        </div>
        <div className="down">
            <KnowMore name={props.pokemonName} exists={exists} />
        </div>          
    </div>
}

export default Card;