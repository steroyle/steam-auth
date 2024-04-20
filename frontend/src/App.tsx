import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { GlobalStateProvider } from './context/GlobalStateContext';

export default function App() {
  return (
    <GlobalStateProvider>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Router />
      </MantineProvider>
    </GlobalStateProvider>
  );
}
