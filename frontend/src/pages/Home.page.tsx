import Login from '@/components/Login/Login';
import { Welcome } from '@/components/Welcome/Welcome';
import { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

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
        console.log(globalState);
      });
  }, [globalState.isAuthenticated]);

  // Conditionally render components based on the isLoggedIn state
  return (
    <>
      {globalState.isAuthenticated ? (
        // Show Welcome if the user is logged in
        <Welcome />
      ) : (
        // Otherwise, show the Login component
        <Login />
      )}
    </>
  );
}
