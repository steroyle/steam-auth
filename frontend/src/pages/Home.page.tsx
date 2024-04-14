import Login from '@/components/Login/Login';
import { Welcome } from '@/components/Welcome/Welcome';
import { useEffect, useState } from 'react';

export function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    // It's important to use https in production for secure communication
    fetch('http://localhost:5000/auth/status', {
      credentials: 'include', // Ensures cookies, like the session cookie, are included with the request
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isAuthenticated);
        console.log(data.user.displayName);
      });
  }, []);

  // Conditionally render components based on the isLoggedIn state
  return (
    <>
      {isLoggedIn ? (
        // Show Welcome if the user is logged in
        <Welcome />
      ) : (
        // Otherwise, show the Login component
        <Login />
      )}
    </>
  );
}
