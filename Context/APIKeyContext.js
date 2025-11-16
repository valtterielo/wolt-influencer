import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APIKeyContext = createContext();

export function APIKeyProvider({ children }) {
    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("OPENAI_API_KEY").then((key) => {
            if (key) setApiKey(key);
        });
    }, []);

    const saveApiKey = async (key) => {
        setApiKey(key);
        await AsyncStorage.setItem("OPENAI_API_KEY", key);
    };

    return (
        <APIKeyContext.Provider value={{ apiKey, saveApiKey }}>
            {children}
        </APIKeyContext.Provider>
    );
}

export const useAPIKey = () => useContext(APIKeyContext);
