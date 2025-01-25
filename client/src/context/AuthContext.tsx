import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Adjust the import based on your Firebase setup
import { User } from '../types'; // Import your User type

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser({ uid: user.uid, email: user.email });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        await auth.signInWithEmailAndPassword(email, password);
    };

    const register = async (email: string, password: string) => {
        await auth.createUserWithEmailAndPassword(email, password);
    };

    const logout = async () => {
        await auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
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