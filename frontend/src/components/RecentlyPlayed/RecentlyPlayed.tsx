import { Card, SimpleGrid, Title, Image, Text, Group, Flex, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

interface RecentlyPlayedGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
}

export default function RecentlyPlayed() {
  const [recentlyPlayedGames, setRecentlyPlayedGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/games/recently-played', {
      credentials: 'include', // Ensures cookies, like the session cookie, are included with the request
    })
      .then((response) => response.json())
      .then((data) => {
        setRecentlyPlayedGames(data.games);
      });
  }, []);

  return (
    recentlyPlayedGames && (
      <>
        <Title order={2} mb="lg">
          Recent played
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          {recentlyPlayedGames.map((game: RecentlyPlayedGame) => {
            const hoursPlayedLastTwoWeeks = Math.round(game.playtime_2weeks / 60);
            const hoursPlayedForever = Math.round(game.playtime_forever / 60);
            return (
              <Card shadow="sm" padding="sm" radius="sm" withBorder key={game.appid}>
                <Flex gap="sm">
                  <Image
                    src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                    height={32}
                    width={32}
                    alt={game.name}
                    radius="md"
                  />
                  <Stack gap={4}>
                    <Title order={3} size={16} fw={500} mb={0}>
                      {game.name}
                    </Title>
                    <Group gap={4}>
                      <Text size="sm" c="dimmed" fw={700}>
                        {hoursPlayedLastTwoWeeks < 1
                          ? 'Under 1 hour'
                          : `${hoursPlayedLastTwoWeeks} hours`}
                      </Text>
                      <Text size="sm" c="dimmed" fs="italic">
                        - past 2 weeks
                      </Text>
                    </Group>
                    <Group gap={4}>
                      <Text size="sm" c="dimmed" fw={700}>
                        {hoursPlayedForever < 1 ? 'Under 1 hour' : `${hoursPlayedForever} hours`}
                      </Text>
                      <Text size="sm" c="dimmed" fs="italic">
                        - all time
                      </Text>
                    </Group>
                  </Stack>
                </Flex>
              </Card>
            );
          })}
        </SimpleGrid>
      </>
    )
  );
}
