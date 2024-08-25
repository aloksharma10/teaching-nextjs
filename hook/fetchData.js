"use client"

import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export const useFetchData = ({ url, body, method = "GET", headers }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState(null);

    const fetchData = useCallback(async ({ _url: fetchUrl, body: fetchBody, _method: fetchMethod, headers: fetchHeaders, successMessage, errorMessage } = {}) => {
        try {
            setIsLoading(true);
            const req = await fetch(fetchUrl || url, {
                method: fetchMethod || method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                    ...fetchHeaders,
                },
                body: fetchBody ? JSON.stringify(fetchBody) : body ? JSON.stringify(body) : null,
            });
            const result = await req.json();
            setData(result);

            if (( !!fetchMethod && fetchMethod !== "GET") || (!!method && method !== "GET")) toast.success(successMessage);
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
            // toast.error(`${error.message}`);
            toast.error(errorMessage);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }, [url, body, method, headers]);

    return {
        isLoading,
        isError,
        errorMessage,
        data,
        fetchData,
    };
};
