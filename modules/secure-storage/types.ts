export const StorageKeys = {
    "geminiApiKey":"",

}
export type SecureStorageKeyType = keyof typeof StorageKeys;
export type GeminiDataType = {
    key: SecureStorageKeyType;  
    geminiApiKey: string;
}
export type SecureStorageDataType =  GeminiDataType 
