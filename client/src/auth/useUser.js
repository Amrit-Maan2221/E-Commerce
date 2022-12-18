import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        if (token) {
            const encodedPayload = token.split('.')[1];
            return JSON.parse(atob(encodedPayload));
        }
    }

    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getPayloadFromToken(token).user;
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            const tokenPayload = getPayloadFromToken(token);
            setUser(tokenPayload.user);
        }
    }, [token]);

    return user;
}