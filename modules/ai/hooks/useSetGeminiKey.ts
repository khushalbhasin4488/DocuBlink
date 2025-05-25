import { secureStoreClient } from "@/modules/secure-storage";
import { useAiStore } from "@/store/aiSlice";
import { useState } from "react";
import { getGeminiResult } from "../utils/getGeminiResult";

export const useSetGeminiKey = ()=>{
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState< boolean> (false);
    const [error, setError] = useState<string | null>(null);

    const setGeminiApiKeyState = useAiStore(state => state.setGeminiApiKeyState);
    
    const setGeminiKey = async (apiKey: string) => {
        setLoading(true);
        setError(null);
        setMessage("testing gemini key...");
        try {
            let geminiresponse = await getGeminiResult("hello how are you", apiKey)
            console.log(geminiresponse)
            await secureStoreClient.handleSetStoreSecure(
                {
                    key: "geminiApiKey",
                    geminiApiKey: apiKey
                }
            )
            setGeminiApiKeyState(apiKey);
            setMessage("Gemini API key set successfully.");
        

        } catch (err) {
            setError("Failed to set Gemini API key.");
        } finally {
            setLoading(false);
        }
    };
    return {
        message,
        loading,
        error,
        setGeminiKey
    };
}