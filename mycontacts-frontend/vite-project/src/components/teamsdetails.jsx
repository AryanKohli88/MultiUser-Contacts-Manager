import React, { useState, useEffect } from "react";
import "../UserProfile.css";
import AddTeam from './AddTeam';
import Cookies from 'js-cookie';

function UserAndTeamsDetails(props) {
  const [showDialog, setShowDialog] = useState(false);
  const [pokemonSprites, setPokemonSprites] = useState({});
  const [teams, setTeams] = useState(props.teams);  // State to manage teams
  const user = props.user;
  const pokemonNames = props.pokemonNames;

  // Fetch Pokémon sprite URLs
  useEffect(() => {
    const fetchPokemonSprites = async () => {
      const spriteMap = {};
      for (const team of pokemonNames) {
        for (const name of team) {
          if (!spriteMap[name]) {  // Fetch each Pokémon sprite only once
            try {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
              const data = await response.json();
              spriteMap[name] = data.sprites.front_default;
            } catch (error) {
              console.error(`Failed to fetch sprite for ${name}:`, error);
            }
          }
        }
      }
      setPokemonSprites(spriteMap);
    };

    fetchPokemonSprites();
  }, [pokemonNames]);

  const handleAddButtonClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleDeleteTeam = async (teamId) => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    const host = import.meta.env.VITE_BACKEND_HOST;
    try {
      await fetch(`${host}/api/team/${teamId}`, {  // Adjust the endpoint as needed
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      props.onRemoveTeam(teamId);
      alert('team dealeted');
    } catch (error) {
      console.error('Failed to delete team:', error);
    }
  };

  // Add a callback to handle adding a new team
  const handleAddNewTeam = (newTeam) => {
    props.onAddTeam(newTeam);
  };

  useEffect(() => {
    setTeams(props.teams);
  }, [props.teams]);

  return (
    <div className="container">
      <h1>User Profile</h1>
      {user && (
        <div className="user-welcome">
          <h2>Welcome {user.username}</h2>
        </div>
      )}
      <h2>User Teams</h2>
      {teams.length > 0 ? (
        teams.map((team, teamIndex) => (
          <div className="team-box" key={team._id}>
            <button 
              className="delete-button" 
              onClick={() => handleDeleteTeam(team._id)}
              aria-label="Delete Team"
            >
              Delete Team
            </button>
            <h3>Team Name: {team.team_name}</h3>
            <div className="pokemon-list">
              {pokemonNames[teamIndex]?.map((name, pokedexIndex) => (
                <div className="pokemon-item" key={pokedexIndex}>
                  <img 
                    src={pokemonSprites[name]} 
                    alt={name} 
                    className="pokemon-sprite"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>No teams found</div>
      )}
      <button className="add-button" onClick={handleAddButtonClick}>
        ADD
      </button>
      {showDialog && (
        <>
          <div className="dialog-overlay show" onClick={handleCloseDialog}></div>
          <div className="dialog-box show">
            <span className="dialog-close" onClick={handleCloseDialog}>
              &times;
            </span>
            <h3>
              <AddTeam onAddTeam={handleAddNewTeam} />
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default UserAndTeamsDetails;
