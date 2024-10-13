import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
    });

    const navigate = useNavigate();

    const login = (userData, accessToken, refreshToken) => {
        setAuthState({
            isAuthenticated: true,
            user: userData,
            accessToken,
            refreshToken,
        });

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));

        navigate('/userform');
    };

    const register = (userData, accessToken, refreshToken) => {
        setAuthState({
            isAuthenticated: true,
            user: userData,
            accessToken,
            refreshToken,
        });

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));

        navigate('/userform');
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            user: null,
            accessToken: null,
            refreshToken: null,
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        navigate('/login');
    };


    const refreshAccessToken = (newAccessToken) => {
        setAuthState((prevState) => ({
            ...prevState,
            accessToken: newAccessToken,
        }));

        localStorage.setItem('accessToken', newAccessToken);
    };

    useEffect(() => {
        const savedAccessToken = localStorage.getItem('accessToken');
        const savedRefreshToken = localStorage.getItem('refreshToken');
        const savedUser = localStorage.getItem('user');

        if (savedAccessToken && savedRefreshToken && savedUser) {
            setAuthState({
                isAuthenticated: true,
                user: JSON.parse(savedUser),
                accessToken: savedAccessToken,
                refreshToken: savedRefreshToken,
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authState, login, register, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
