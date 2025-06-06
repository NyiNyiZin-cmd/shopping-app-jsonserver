import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider - Checking for stored user');
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('AuthProvider - Found stored user:', storedUser);
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('AuthProvider - Parsed user data:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('AuthProvider - Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log('AuthProvider - No stored user found');
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    console.log('AuthProvider - Login attempt with:', { email });
    // In a real app, you would validate credentials with your backend
    if (email === 'admin@example.com' && password === 'admin123') {
      const userData = { email, role: 'admin' };
      console.log('AuthProvider - Admin login successful');
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    // For demo, any other email/password will be treated as regular user
    const userData = { email, role: 'user' };
    console.log('AuthProvider - Regular user login successful');
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const logout = () => {
    console.log('AuthProvider - Logging out user');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  console.log('AuthProvider - Current auth state:', value);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
