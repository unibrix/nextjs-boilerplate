'use client';

import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { UserResponseDto } from '@/api/generated/data-contracts';
import type { AuthState, LoginInput, RegisterInput } from '@/types/auth';
import { api } from '@/lib/api-client';

const TOKEN_KEY = 'auth_token';

const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    api.setToken(token);
  }
};

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

const clearToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    api.removeToken();
  }
};

interface AuthContextValue extends AuthState {
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  loginWithGoogle: (accessToken: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<UserResponseDto>) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (!token) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      try {
        const response = await api.userControllerGetProfile();
        setState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        clearToken();
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (data: LoginInput) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.authControllerLogin({
        email: data.email,
        password: data.password,
      });

      if (response.data?.accessToken) {
        setToken(response.data.accessToken);
      }

      setState({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterInput) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      const response = await api.authControllerSignup(registerData);

      if (response.data?.accessToken) {
        setToken(response.data.accessToken);
      }

      setState({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const loginWithGoogle = useCallback(async (accessToken: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/google/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: accessToken }),
        }
      );

      if (!response.ok) {
        throw new Error('Google login failed');
      }

      const data = await response.json();
      if (data?.accessToken) {
        setToken(data.accessToken);
      }

      setState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const updateUser = useCallback((userData: Partial<UserResponseDto>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null,
    }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      register,
      loginWithGoogle,
      logout,
      updateUser,
    }),
    [state, login, register, loginWithGoogle, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
