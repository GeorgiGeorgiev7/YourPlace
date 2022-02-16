import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";


let navigate;
let logoutTimer;

const useAuth = () => {
    navigate = useNavigate();

    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const [userId, setUserId] = useState(null);


    const login = useCallback((uid, token, expirationDate) => {
        setUserId(uid);
        setToken(token);

        expirationDate = expirationDate || new Date(
            new Date().getTime() + 1000 * 60 * 60
        );

        setTokenExpirationDate(expirationDate);

        localStorage.setItem('userData', JSON.stringify({
            userId: uid,
            token,
            expiration: expirationDate.toISOString()
        }));

        navigate('/');

    }, []);

    const logout = useCallback(() => {
        setUserId(null);
        setToken(null);
        setTokenExpirationDate(null);

        localStorage.removeItem('userData');

        navigate('/');

    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }

    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.token && new Date(userData.expiration) > new Date()) {
            login(userData.userId, userData.token);
        }

    }, [login]);

    return { userId, token, login, logout };
};

export default useAuth;