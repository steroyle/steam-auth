import Login from '@/components/Login/Login';
import { Welcome } from '@/components/Welcome/Welcome';
import { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import OwnedGames from '@/components/OwnedGames/OwnedGames';
import RecentlyPlayed from '@/components/RecentlyPlayed/RecentlyPlayed';

export function HomePage() {
  const { globalState, actions } = useGlobalState();

  useEffect(() => {
    fetch('http://localhost:5000/auth/steam/status', {
      credentials: 'include', // Ensures cookies, like the session cookie, are included with the request
    })
      .then((response) => response.json())
      .then((data) => {
        actions.setIsAuthenticated(data.isAuthenticated);
        actions.setUser(data.user);
      });
  }, [globalState.isAuthenticated]);

  return globalState.isAuthenticated ? (
    <>
      <Welcome />
      <RecentlyPlayed />
    </>
  ) : (
    <Login />
  );
}
