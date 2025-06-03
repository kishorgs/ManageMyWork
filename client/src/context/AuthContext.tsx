import { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'engineer' | 'manager';
}

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string, name: string, role: 'engineer' | 'manager', department: string, skills?: string[], seniority?: 'junior' | 'mid' | 'senior', maxCapacity?: number) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch((error: AxiosError) => {
          console.error('Failed to fetch profile:', error.message);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: 'engineer' | 'manager',
    department: string,
    skills?: string[],
    seniority?: 'junior' | 'mid' | 'senior',
    maxCapacity?: number
  ) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
        name,
        role,
        department,
        skills,
        seniority,
        maxCapacity,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw new Error('Signup failed: ' + (error as AxiosError).message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw new Error('Login failed: ' + (error as AxiosError).message);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
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