import { SecureStorageKeyType } from '@/modules/secure-storage/types';
import * as SecureStore from 'expo-secure-store';
import { SecureStorageDataType } from './types';

class SecureStoreClient {
    public static instance: SecureStoreClient;
    private constructor() {}

    public static getInstance(): SecureStoreClient {
        if (!SecureStoreClient.instance) {
            SecureStoreClient.instance = new SecureStoreClient();
        }
        return SecureStoreClient.instance;
    }

    public async handleSetStoreSecure(data: SecureStorageDataType) {
        try {
            let key = data.key
            const jsonValue = JSON.stringify(data);
            await SecureStore.setItemAsync(key, jsonValue);
        }
        catch (err) {
            console.error("Error setting secure storage: ", err);
            throw err;
        }
    }

    public async handleGetStoreSecure(key: SecureStorageKeyType): Promise<SecureStorageDataType | null> {
        try {
            const jsonValue = await SecureStore.getItemAsync(key);
            if (jsonValue) {
                let value = JSON.parse(jsonValue) as SecureStorageDataType;
                return value;
            }
            return null;
        } catch (err) {
            console.error("Error getting secure storage: ", err);
            throw err;
        }
    }

    public async handleDeleteStoreSecure(key: SecureStorageKeyType) {
        try {
            await SecureStore.deleteItemAsync(key);
            
        }
        catch (err) {
            console.error("Error deleting key:", err);
            throw err;
        }
    }

    public handleClearStoreSecure = async () => {
        try {
            await this.handleDeleteStoreSecure("geminiApiKey");
            await this.handleDeleteStoreSecure("userData");
        }
        catch (err) {
            console.error("Error clearing store:", err);
            throw err;
        }
    }

    public static loadStoreKeys = async () => {

    }
}

export const secureStoreClient = SecureStoreClient.getInstance(); 