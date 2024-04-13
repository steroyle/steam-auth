import Login from '@/components/Login/Login';
import { Welcome } from '@/components/Welcome/Welcome';
import { useEffect, useState } from 'react';

export function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/auth/session')
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isAuthenticated);
      });
  }, []);

  return (
    <>
      <Welcome />
      <Login />
    </>
  );
}
