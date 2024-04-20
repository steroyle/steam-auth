import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalState {
  isAuthenticated: boolean;
  user: User | null;
}

interface User {
  steamId: number;
  displayName: string;
  avatarUrl: string;
}

interface GlobalStateContextType {
  globalState: GlobalState;
  actions: {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: User | null) => void;
  };
}

// Create the context with an initial undefined value
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Hook for child components to consume the context
export function useGlobalState(): GlobalStateContextType {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}

// Provider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalState, setState] = useState<GlobalState>({
    isAuthenticated: false,
    user: null,
  });

  const actions = {
    setIsAuthenticated: (isAuthenticated: boolean) =>
      setState((current) => ({ ...current, isAuthenticated })),
    setUser: (user: User | null) => setState((current) => ({ ...current, user })),
  };

  return (
    <GlobalStateContext.Provider value={{ globalState, actions }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
