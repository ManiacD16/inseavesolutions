import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API_BASE_URL from '../config/api';

interface User {
    id: number;
    username: string;
    email?: string; // Optional
    phone?: string; // Optional
    name?: string;  // Optional
    role?: string;  // Optional
    profile_pic?: string; // Optional
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser || storedUser === 'undefined') return null;
            return JSON.parse(storedUser);
        } catch (e) {
            console.error("AuthContext: Failed to parse user", e);
            return null;
        }
    });
    const [token, setToken] = useState<string | null>(() => {
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken || storedToken === 'undefined') return null;
            return storedToken;
        } catch (e) {
            return null;
        }
    });
    const navigate = useNavigate();

    // Removed useEffect that was causing the flash

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success(`Welcome back, ${newUser.name || newUser.username}!`);
        navigate('/admin');
    };

    const logout = async () => {
        const loadingToastId = toast.loading('Logging out...');
        try {
            if (token) {
                await fetch(`${API_BASE_URL}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            toast.success('Logged out successfully', { id: loadingToastId });
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Session ended', { id: loadingToastId });
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/admin/login');
        }
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!token }}>
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
