import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { StyleSheet } from "react-native"

export const DataDrawerPage = ()=>{
    return (
        < ThemedView style={styles.rootContainer}>
    <ThemedText>
        helo
    </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        width:"100%",
        height:"100%"
    }
})