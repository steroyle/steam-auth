import { useGlobalState } from '@/context/GlobalStateContext';
import { Button, Flex, Image, Text } from '@mantine/core';

export default function Avatar() {
  const { globalState } = useGlobalState();

  return (
    <Button
      variant="transparent"
      styles={(theme) => ({
        root: {
          color: 'inherit',
          padding: 0,
        },
      })}
    >
      <Flex gap={10} align="center">
        <Text>{globalState.user?.displayName}</Text>
        <Image src={globalState.user?.avatarUrl} width={32} height={32} />
      </Flex>
    </Button>
  );
}
