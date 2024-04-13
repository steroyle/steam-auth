import { Box, Text } from '@mantine/core';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <Box className={classes.container}>
        <Text ta="center" fz={14}>
          Footer text here
        </Text>
      </Box>
    </footer>
  );
}
