import { useState, useCallback } from 'react';


const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const clearError = () => {
        setError(null);
    };

    const sendRequest = useCallback(
        async (url, method = 'GET', headers = {}, body = null) => {
            setIsLoading(true);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers
                });

                const data = await response.json();

                if (!response.ok) {
                    throw data;
                }

                setIsLoading(false);
                return data;

            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }
        }, []);

    return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;