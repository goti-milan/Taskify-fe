import React, { createContext, useContext, useState, useEffect } from 'react';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored user data on app start
        const storedUser = localStorage.getItem('taskify_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, _password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, accept any email/password
            const userData: User = {
                id: '1',
                email,
                name: email.split('@')[0]
            };

            setUser(userData);
            localStorage.setItem('taskify_user', JSON.stringify(userData));
            setIsLoading(false);
            return true;
        } catch (error) {
            setIsLoading(false);
            return false;
        }
    };

    const register = async (email: string, _password: string, name: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const userData: User = {
                id: '1',
                email,
                name
            };

            setUser(userData);
            localStorage.setItem('taskify_user', JSON.stringify(userData));
            setIsLoading(false);
            return true;
        } catch (error) {
            setIsLoading(false);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('taskify_user');
    };

    const value = {
        user,
        login,
        register,
        logout,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
