import { useAiStore } from "@/store/aiSlice";
import { useSyncStore } from "@/store/SyncSlice";
import { useState } from "react";
import { secureStoreClient } from "..";

export const useDeleteStorage = () => {
    const [loading, setLoading] = useState<boolean>(false)
  const {reset: AiStoreReset} = useAiStore();
  const {reset: SyncStoreReset} = useSyncStore()
  const deleteStorage = async () => {
    try {
      setLoading(true);
      console.log("Deleting all secure storage...");
      // Assuming secureStoreClient has a method to clear all storage
      await secureStoreClient.handleClearStoreSecure();
      // Reset zustand stores
      AiStoreReset();
      SyncStoreReset();
      console.log("All secure storage deleted successfully.");
    } catch (error) {
      console.error("Error deleting secure storage:", error);
      throw new Error("Failed to delete secure storage.");
    } finally {
      setLoading(false);
    }
  }
    

  return {
   loading ,
   deleteStorage
  };
}