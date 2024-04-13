import { Title, Text } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={50}>
        Achievement{' '}
        <Text
          component="span"
          inherit
          variant="gradient"
          gradient={{ from: '#eb3349', to: '#f45c43' }}
        >
          Buddy
        </Text>
      </Title>

      <Text ta="center" fz={24} fw={700}>
        Connect, Collaborate, Conquer
      </Text>

      <Text ta="center" maw={500} mt={20} mx="auto">
        Unlock the full potential of your gaming adventures with Achievement Buddy, where every
        achievement is a shared victory and every challenge, an opportunity to team up with a new
        friend!
      </Text>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl"></Text>
    </>
  );
}
