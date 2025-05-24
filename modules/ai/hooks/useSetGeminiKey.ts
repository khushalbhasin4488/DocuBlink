import { handleSetStoreSecure } from "@/modules/secure-storage/utils";
import { useAiStore } from "@/store/aiSlice";
import { useState } from "react";
import { getGeminiResult } from "../utils/getGeminiResult";

export const useSetGeminiKey = ()=>{
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState< boolean> (false);
    const [error, setError] = useState<string | null>(null);
    const setGeminiApiKey = useAiStore(state => state.setGeminiApiKey);
    const setGeminiKey = async (apiKey: string) => {
        setLoading(true);
        setError(null);
        setMessage("testing gemini key...");
        try {
            let geminiresponse = await getGeminiResult("hello how are you", apiKey)
            console.log(geminiresponse)
            await handleSetStoreSecure({geminiApiKey: apiKey})
            setGeminiApiKey(apiKey);
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