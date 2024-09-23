import React from "react";
function FoundInGames(props){
    if(props.data)
    console.log(props.data.game_indices);

    let games;

    if (props.data && props.data.game_indices) {
        games = props.data.game_indices.map((element, index) => {
        let gamename = element.version.name.toUpperCase();

        const combinedStyle = {
        backgroundColor: 'gray',
        color: 'black',
        margin: '5px',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',

        // Not working?????????????
        // ':hover':{
        //     backgroundColor: 'white',
        // }
        };

          return (
            <button
              key={index}
              style={combinedStyle}
            >
              {gamename}
            </button>
          );
        });
      } else {
        games = <p>Not found in any Games</p>
      }

    return <div>
        {games}
    </div>
}

export default FoundInGames;