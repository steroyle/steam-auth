import { Button, Menu, rem } from '@mantine/core';
import { IconSettings, IconLogout } from '@tabler/icons-react';
import Avatar from '../Avatar/Avatar';
import { useGlobalState } from '@/context/GlobalStateContext';

export default function UserMenu() {
  const { globalState } = useGlobalState();

  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/auth/steam/logout';
  };

  return (
    globalState.isAuthenticated && (
      <Menu
        shadow="md"
        width={200}
        position="bottom-end"
        trigger="click"
        openDelay={100}
        closeDelay={400}
        withArrow
        arrowPosition="center"
        menuItemTabIndex={0}
      >
        <Menu.Target>
          <Button
            variant="transparent"
            styles={(theme) => ({
              root: {
                color: 'inherit',
                padding: 0,
              },
            })}
          >
            <Avatar />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}>
            Settings
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}
            onClick={handleLogout}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  );
}
