import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, setToken as saveToken, removeToken as clearToken, getToken, getUser as getStoredUser, setUser as saveUser } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  username: string;
  email: string;
  plan: string;
  max_deployments: number;
  api_key: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, plan?: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const storedUser = getStoredUser();

      if (token && storedUser) {
        setUser(storedUser);
        // Optionally refresh user data from server
        try {
          const response = await authApi.getProfile();
          if (response.success && response.data) {
            setUser(response.data.user);
            saveUser(response.data.user);
          }
        } catch (error) {
          console.error('Failed to refresh user:', error);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login({ email, password });

      if (response.success && response.data) {
        const { token, user: userData } = response.data;
        saveToken(token);
        saveUser(userData);
        setUser(userData);
        
        toast({
          title: 'Welcome back!',
          description: `Logged in as ${userData.username}`,
        });

        return true;
      } else {
        toast({
          title: 'Login failed',
          description: response.error || 'Invalid credentials',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Login error',
        description: 'An error occurred during login',
        variant: 'destructive',
      });
      return false;
    }
  };

  const signup = async (
    username: string,
    email: string,
    password: string,
    plan: string = 'free'
  ): Promise<boolean> => {
    try {
      const response = await authApi.signup({ username, email, password, plan });

      if (response.success && response.data) {
        const { token, user: userData } = response.data;
        saveToken(token);
        saveUser(userData);
        setUser(userData);

        toast({
          title: 'Account created!',
          description: `Welcome, ${userData.username}!`,
        });

        return true;
      } else {
        // Handle validation errors
        let errorMessage = response.error || 'Could not create account';
        
        if (response.errors && response.errors.length > 0) {
          errorMessage = response.errors.map(err => err.message).join(', ');
        }

        toast({
          title: 'Signup failed',
          description: errorMessage,
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Signup error',
        description: 'An error occurred during signup',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  const refreshUser = async () => {
    try {
      const response = await authApi.getProfile();
      if (response.success && response.data) {
        setUser(response.data.user);
        saveUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
