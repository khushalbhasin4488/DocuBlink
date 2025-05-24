import { useAiStore } from '@/store/aiSlice';
import * as SecureStore from 'expo-secure-store';
import { SecureStorageDataType } from '../types';
import { getKeyFromData, SecureStorageKeyType } from './getKeyFromData';


export const handleSetStoreSecure = async(data: SecureStorageDataType) => {
    try {
        let key = await getKeyFromData(data)
        if(!key){
            throw new Error("secure storage key is not valid")
        }
        const jsonValue = JSON.stringify(data);
        await SecureStore.setItemAsync(key, jsonValue);
    }
    catch(err) {
        console.error("Error setting secure storage: ", err);
        throw err;
    }
}

export const handleGetStoreSecure = async (key: SecureStorageKeyType): Promise<SecureStorageDataType | null> => {
    try {
        const jsonValue = await SecureStore.getItemAsync(key);
        if (jsonValue) {
            return JSON.parse(jsonValue) as SecureStorageDataType;
        }
        return null;
    } catch (err) {
        console.error("Error getting secure storage: ", err);
        throw err;
    }
}

export const handleDeleteStoreSecure = async(key: SecureStorageKeyType) => {
    const setgeminiApiKey = useAiStore(state=>state.setGeminiApiKey)
    try {
        switch (key){
            case "geminiApiKey":
               setgeminiApiKey(null) 
        }
        await SecureStore.deleteItemAsync(key);
    }
    catch(err) {
        console.error("Error deleting key:", err);
        throw err;
    }
}

export const handleClearStoreSecure = async() => {
    try {

        await SecureStore.deleteItemAsync("geminiApiKey");
        
    }
    catch(err) {
        console.error("Error clearing store:", err);
        throw err;
    }
}

export const loadStoreKeys = async()=>{
    
}