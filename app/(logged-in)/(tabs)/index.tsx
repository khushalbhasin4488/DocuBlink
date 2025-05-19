import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SyncSwitch } from "@/components/ui/home/SyncSwitch";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

export default function Index() {
    const colors = useThemeColor()
    return (


        <ThemedView style={styles.rootContainer}>
            <ThemedView style={styles.topView}>
                <View style={styles.syncView}>

                    <ThemedText type="defaultSemiBold">sync</ThemedText>
                    <SyncSwitch />
                </View>
            </ThemedView>

        </ThemedView>
    )
}
const styles = StyleSheet.create({

    container: {
        display: "flex",
        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    rootContainer: {
        flex: 1,
        display: "flex",
        height: "100%",
        width: "100%",
    },
    topView: {
        display: "flex",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "flex-end",
        width: "100%",
    },
    syncView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})