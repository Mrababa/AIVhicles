import React, { createContext, useContext, useState } from 'react';

/**
 * Authentication context providing simple login state management.
 * Currently stores auth state only on the client; real implementations
 * should swap the `login` and `logout` stubs with API calls and store
 * tokens or session data as needed.
 */
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

