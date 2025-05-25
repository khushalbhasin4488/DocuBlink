import { SecureStorageKeyType, StorageKeys } from "../types";

export const checkValidKeyType = (key: string): key is SecureStorageKeyType=> {
    
    return Object.keys(StorageKeys).includes(key);
}