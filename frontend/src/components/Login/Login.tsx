import { Button, Flex, Image } from '@mantine/core';

export default function Login() {
  const handleClick = () => {
    window.location.href = 'http://localhost:5000/auth/steam';
  };

  return (
    <Flex justify="center" py={30}>
      <Button
        variant="transparent"
        h={51}
        px={0}
        onClick={handleClick}
        aria-label="Sign in through steam"
      >
        <Image src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_border.png" />
      </Button>
    </Flex>
  );
}
