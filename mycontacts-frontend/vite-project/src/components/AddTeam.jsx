import React, { useState } from "react";
import Cookies from 'js-cookie';

function AddTeam(props) {
  const [pokemonNames, setPokemonNames] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, event) => {
    const newNames = [...pokemonNames];
    newNames[index] = event.target.value;
    setPokemonNames(newNames);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Fetch Pokédex entry IDs for each Pokémon
      const pokedexEntries = await Promise.all(pokemonNames.map(async (name) => {
        if (name.trim() === '') return null;  // Skip empty names
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) {
          alert(`${name} is not a pokemon`);
          throw new Error(`Failed to fetch Pokémon data for ${name}`);
        }
        const data = await response.json();
        return data.id;
      }));

      // Filter out any null values (in case of empty names or failed requests)
      const validEntries = pokedexEntries.filter(id => id !== null);

      if (validEntries.length === 0) {
        throw new Error('No valid Pokémon names provided.');
      }

      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const teamBody = {
        team_name: teamName || "new team",
        pokemonArray: validEntries
      };
      const host = import.meta.env.VITE_BACKEND_HOST;
      // Send the team data to the server
      const response = await fetch(`${host}/api/team/`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(teamBody),
      });

      if (!response.ok) throw new Error('Failed to save team.');

      const newTeam = await response.json(); // Get the new team data

      // Notify the parent component about the new team
      props.onAddTeam(newTeam);

      alert('Team successfully added!');
      setPokemonNames(Array(6).fill(''));  // Clear the form
      setTeamName('');  // Clear the team name field
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-team-form">
      <h3>Add New Team</h3>
      <div className="team-name-input-group">
        <label>
          Team Name:
          <input
            type="text"
            value={teamName}
            onChange={handleTeamNameChange}
            disabled={loading}
          />
        </label>
      </div>
      {pokemonNames.map((name, index) => (
        <div key={index} className="pokemon-input-group">
          <label>
            Pokémon #{index + 1}:
            <input
              type="text"
              value={name}
              onChange={(event) => handleInputChange(index, event)}
              disabled={loading}
            />
          </label>
        </div>
      ))}
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Team'}
      </button>
    </form>
  );
}

export default AddTeam;
