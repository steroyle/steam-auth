import { Button, Flex } from '@mantine/core';

export default function Login() {
  const handleClick = () => {
    window.location.href = 'http://localhost:5000/auth/steam';
  };

  return (
    <Flex justify="center" py={30}>
      <Button variant="outline" onClick={handleClick}>
        Login to steam
      </Button>
    </Flex>
  );
}
