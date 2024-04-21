import { Text, Box } from '@mantine/core';
import { Nav } from '../Nav/Nav';
import classes from './Header.module.css';
import UserMenu from '../UserMenu/UserMenu';

export default function Header() {
  return (
    <header className={classes.header}>
      <Box className={classes.container}>
        <Text component="span" ta="center" fz={20} fw={700} lh={1} lts="-0.02em">
          Achievement{' '}
          <Text
            component="span"
            inherit
            variant="gradient"
            gradient={{ from: '#eb3349', to: '#f45c43' }}
          >
            Buddy
          </Text>
        </Text>
        <Nav />
        <UserMenu />
      </Box>
    </header>
  );
}
