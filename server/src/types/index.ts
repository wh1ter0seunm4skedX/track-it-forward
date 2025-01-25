

export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}