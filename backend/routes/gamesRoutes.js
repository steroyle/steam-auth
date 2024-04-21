import { Router } from "express";

const router = Router();

router.get('/owned', async (request, response) => {    
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${request.user.steamId}&format=json`;
  
    try {
      const steamResponse = await fetch(url);
      if (!steamResponse.ok) {
        throw new Error('Failed to fetch data from Steam API');
      }
      const data = await steamResponse.json();
      response.json(data.response);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Failed to fetch data from Steam API' });
    }
});

export default router;