import { useContext, createContext } from 'react';

export const AppContext = createContext({
  isAuthenticated: false,
  userHasAuthenticated: (authenticated: boolean) => {},
});

AppContext.displayName = 'AppContext';

export function useAppContext() {
  return useContext(AppContext);
}
