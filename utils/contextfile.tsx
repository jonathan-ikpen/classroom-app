// auth-context.tsx
"use client";
import React, { createContext, useContext, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean | null;
    user: any;
    login: (userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null); // Initialize as null
    const [user, setUser] = React.useState<any | null>(null);

    // Check localStorage for authentication state on component mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            const parsedAuth = JSON.parse(storedAuth);
            setIsAuthenticated(parsedAuth.isAuthenticated);
            setUser(parsedAuth.user);
        } else {
            setIsAuthenticated(false); // Set to false if not found in localStorage
        }
    }, []);

    const login = (userData: any) => {
        setIsAuthenticated(true);
        setUser(userData);
        // Store authentication state in localStorage
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: userData }));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        // Remove authentication state from localStorage
        localStorage.removeItem('auth');
    };

    const contextValue: AuthContextProps = {
        isAuthenticated,
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    // Check if running on the server, and provide a dummy context for SSR.
    if (!context && typeof window === 'undefined') {
        return {
            isAuthenticated: false,
            user: null,
            login: () => {},
            logout: () => {},
        };
    }

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
