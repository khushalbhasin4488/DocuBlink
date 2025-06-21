import { useAiStore } from "@/store/aiSlice";
import { useSyncStore } from "@/store/SyncSlice";
import { useUserDataStore } from "@/store/userSlice";
import { useState } from "react";
import { secureStoreClient } from "..";
import { SecureStorageKeyType } from "../types";

export const useDeleteStorage = () => {
    const [loading, setLoading] = useState<boolean>(false)
  const {reset: AiStoreReset} = useAiStore();
  const {reset: SyncStoreReset} = useSyncStore()
  const { reset: userStoreReset} = useUserDataStore()
  const deleteStorage = async () => {
    try {
      setLoading(true);
      console.log("Deleting all secure storage...");
      await secureStoreClient.handleClearStoreSecure();
      AiStoreReset();
      SyncStoreReset();
      userStoreReset()
      console.log("All secure storage deleted successfully.");
    } catch (error) {
      console.error("Error deleting secure storage:", error);
      throw new Error("Failed to delete secure storage.");
    } finally {
      setLoading(false);
    }
  }
   const deleteKey = async (key: SecureStorageKeyType) => {
    try {
      setLoading(true);
      console.log(`Deleting key: ${key} from secure storage...`);
      await secureStoreClient.handleDeleteStoreSecure(key);
    switch (key) {
        case "geminiApiKey":
            AiStoreReset();
            break;
        case "syncData":
            SyncStoreReset();
            break;
        case "userData":
            userStoreReset();
            break;
        default:
            break;  
    }      


    } catch (error) { 
      console.log("Error deleting key from secure storage:", error);
      throw new Error(`Failed to delete key: ${key} from secure storage.`);
    } finally {
      setLoading(false);
    }
  } 

  return {
   loading ,
   deleteStorage,
   deleteKey
  };
}