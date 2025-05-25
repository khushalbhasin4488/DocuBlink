import { secureStoreClient } from "@/modules/secure-storage";
import { useAiStore } from "@/store/aiSlice";
import { useCallback, useState } from "react";
import { StorageKeys } from "../types";

export const useLoadStates = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadedKeys, setLoadedKeys] = useState<Record<string, any>>({});
    const setGeminiApiKeyState = useAiStore(state => state.setGeminiApiKeyState);

    const loadStates = useCallback(async () => {
        /**
         * This function loads states from secure storage.
         * and updates the zustand store with the loaded values.
         */
        try {
            console.log("Loading states from secure storage...");
            setLoading(true);
            const keys = Object.keys(StorageKeys) as Array<keyof typeof StorageKeys>;
            const results: Record<string, any> = {};
            
            for (const key of keys) {
                const result = await secureStoreClient.handleGetStoreSecure(key);
                if (result) {
                    console.log(`Loaded ${key}:`, result);
                    results[key] = result;
                    
                    // Update store state based on the loaded value
                    switch (key) {
                        case "geminiApiKey":
                            setGeminiApiKeyState(result.geminiApiKey);
                            break;
                    }
                } else {
                    console.warn(`No value found for key: ${key}`);
                }
            }
            
            setLoadedKeys(results);
        } catch (error) {
            console.error("Error loading states:", error);
        } finally {
            setLoading(false);
        }
    }, [setGeminiApiKeyState]);

    return { loadStates, loading, loadedKeys };
};

