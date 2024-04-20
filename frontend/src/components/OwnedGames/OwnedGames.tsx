import { useGlobalState } from '@/context/GlobalStateContext';
import { useEffect, useState } from 'react';

interface Game {
  appid: number;
  playtime_deck_forever: number;
  playtime_disconnected: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
  rtime_last_played: number;
}

export default function OwnedGames() {
  const { globalState } = useGlobalState();
  const [gamesOwned, setGamesOwned] = useState([]);
  const [totalGamesOwned, setTotalGamesOwned] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/games/owned', {
      credentials: 'include', // Ensures cookies, like the session cookie, are included with the request
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGamesOwned(data.games);
        setTotalGamesOwned(data.game_count);
      });
  }, [globalState.isAuthenticated]);

  return (
    <>
      {gamesOwned.map((game: Game) => (
        <div key={game.appid}>{game.appid}</div> // Use <div> or any other wrapper for each game
      ))}
      {totalGamesOwned ? `Total games owned: ${totalGamesOwned}` : null}
    </>
  );
}
