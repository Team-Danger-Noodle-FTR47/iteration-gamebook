import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card.jsx';

import '../stylesheets/Likepage.scss';


const LikePage = ({user}) => {
    const navigate = useNavigate();
    console.log("hiiiii")
    const [likegames, setLikeGames] = useState([]);
    
useEffect(() =>{

const getLikedGames = async () => {
    try {
      
      const response = await fetch(`http://localhost:3000/likegame?username=${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: {username : "apple"} 
      }); // check with the backend
      if (!response.ok) {
        throw new Error ('Failed  to fetch user liked game from database')
      }
      const data = await response.json();
      console.log(data);
      setLikeGames(data);
    } catch (err) {
      console.error('Error getting your liked page');
    }
}
getLikedGames();

},[])

return (  
<div >
  <h1 className='likes'>My Likes</h1>
  <div className="apple">
{likegames.map(game => (
  <Card key={game.id} game={game} onLike={() => onLike(game.name)} />
))}
</div>
</div>);


}
export default LikePage;