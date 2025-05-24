import { SecureStorageDataType } from "../types";

export type SecureStorageKeyType ="geminiApiKey"

export const getKeyFromData = async(data: SecureStorageDataType): Promise<SecureStorageKeyType | null>=>{
    switch(Object.keys(data)[0]){
        case "geminiApiKey": 
            return "geminiApiKey"
        default:
            return null 
    }
}