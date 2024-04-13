import { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import classes from './Layout.module.css';
import { Box, Flex } from '@mantine/core';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box className={classes.layout}>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </Box>
  );
}
