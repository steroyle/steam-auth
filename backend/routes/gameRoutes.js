import { Router } from "express";

const router = Router();

router.get('/achievements', async (request, response) => {    
    const appId = 35140;
    const url = `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${process.env.STEAM_API_KEY}&appid=${appId}&l=english&format=json`;
    
    try {
      const steamResponse = await fetch(url);
      if (!steamResponse.ok) {
        throw new Error('Failed to fetch data from Steam API');
      }
      const data = await steamResponse.json();
      response.json(data.game);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Failed to fetch data from Steam API' });
    }
});

export default router;