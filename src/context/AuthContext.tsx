import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser, fetchCurrentUser } from '../api/auth.api';
import { cookies } from '../utils/functions';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, name: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUser = async () => {
        try {
            const res = await fetchCurrentUser();
            if (res?.success) {
                setUser(res?.data);
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // 🔹 LOGIN
    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const res = await loginUser({ email, password });

            if (res?.success) {
                const { accessToken, refreshToken } = res.data.token;
                cookies.set('token', accessToken);
                cookies.set('refreshToken', refreshToken);
                await loadUser();
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    // 🔹 REGISTER (same flow)
    const register = async (
        email: string,
        password: string,
        name: string
    ): Promise<boolean> => {
        setIsLoading(true);
        try {
            const res = await registerUser({ email, password, name });

            if (res?.success) {
                const { accessToken, refreshToken } = res.data.token;
                cookies.set('token', accessToken);
                cookies.set('refreshToken', refreshToken);

                await loadUser();
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    // 🔹 LOGOUT
    const logout = () => {
        cookies.remove('token');
        cookies.remove('refreshToken');
        setUser(null);
    };

    // 🔹 AUTO AUTH ON REFRESH
    useEffect(() => {
        const token = cookies.get('token');
        if (token) {
            loadUser();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isLoading,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
