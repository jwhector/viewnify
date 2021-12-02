import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        if (!userToken) return setToken(null);
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    console.log(token);

    return {
        setToken: saveToken,
        token
    }
}