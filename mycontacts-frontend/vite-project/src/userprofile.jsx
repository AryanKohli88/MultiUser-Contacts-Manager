import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import TopBar from './components/TopBar';
import UserProfilePic from './components/profilepic';
import UserAndTeamsDetails from './components/teamsdetails';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
          throw new Error('No access token found');
        }
        const host = import.meta.env.VITE_BACKEND_HOST;
        // Fetch user profile
        const userResponse = await fetch(`${host}/api/user/current/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch teams
        const teamsResponse = await fetch(`${host}/api/team/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!teamsResponse.ok) {
          throw new Error('Failed to fetch user teams');
        }
        const teamsData = await teamsResponse.json();
        setTeams(teamsData);

        // Fetch Pokémon names
        const fetchPokemonNames = async () => {
          const names = await Promise.all(teamsData.map(async (team) => {
            const pokemonNamesPromises = team.pokemonArray.map(async (entry) => {
              try {
                const name = await fetchnames(entry);
                return name;
              } catch (error) {
                console.error(`Failed to fetch name for Pokémon entry ${entry}:`, error.message);
                return 'Unknown';
              }
            });
            return Promise.all(pokemonNamesPromises);
          }));
          setPokemonNames(names);
        };

        await fetchPokemonNames();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchnames = async (entry) => {
      try {
        const info = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry}`);
        if (!info.ok) throw new Error('Failed to fetch Pokémon name');
        const infojson = await info.json();
        return infojson.forms[0].name;
      } catch (e) {
        console.log(e);
        setError(e.message);
        return 'Unknown';
      }
    };

    fetchData();
  }, []);

  const handleAddTeam = async (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const handleRemoveTeam = async (teamId) => {
    setTeams(teams.filter(team => team._id !== teamId));
    // team name is changing but not the conten (pokemon list), same when adding a team.
  }

  const handleLogout = () => {
    Cookies.remove('accessToken'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  if (loading) return <div className="searchLabel">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <TopBar />
      {/* <button onClick={handleLogout} style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer', }}> */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#dc3545',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
      {/* </button> */}
      <UserAndTeamsDetails 
        user={user} 
        teams={teams} 
        pokemonNames={pokemonNames} 
        onAddTeam={handleAddTeam}
        onRemoveTeam={handleRemoveTeam}
      />
      <UserProfilePic username={user.username}/>
    </div>
  );
}

export default UserProfile;
