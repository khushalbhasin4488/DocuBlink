import { useThemeColor } from "@/hooks/useThemeColor";
import { useSyncStore } from "@/store/SyncSlice";
import { Switch } from "react-native";

export function SyncSwitch(){
    const syncValue = useSyncStore((state)=>state.syncValue)
    const setSyncValue= useSyncStore(state=>state.setSyncValue)
    const colors =useThemeColor()
    return(
        <Switch
        trackColor={{ false: colors.button_colors.neutral_default, true:  colors.button_colors.info}}
        thumbColor={colors.button_colors.primary}
        value={syncValue}
        onValueChange={() => {setSyncValue(!syncValue)}}
        />
    )
}