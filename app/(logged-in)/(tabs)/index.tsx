import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { SyncSwitch } from "@/components/ui/home/SyncSwitch";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
    const [formUrl, setFormUrl] = useState<string>("")
    const colors = useThemeColor()
    return (
        <ThemedView style={styles.rootContainer}>
                <View style={styles.syncView}>

                    <ThemedText type="defaultSemiBold">sync</ThemedText>
                    <SyncSwitch />
                </View>
                <View>
        <ThemedText type="subtitle">Docublink</ThemedText>
            </View>
            <View style={styles.formViewContainer}>
                <ThemedText type="defaultSemiBold" style={{color: colors.button_colors.danger}}>
                    QuickForm
                </ThemedText>

            <View style={styles.formView}>

        <ThemedTextInput value={formUrl} setValue={setFormUrl} placeholder={"https://forms.google.com/abc"} style={styles.formInput}/>
        <ThemedButton type="neutral_default" style={styles.formViewButton}>

        <Ionicons name="send" size= {32} color={colors.button_colors.primary} />
        </ThemedButton>
            </View>
            <ThemedText type="default" style={styles.formViewDescription} >
            ⓘ save your information to fill in google forms automatically .
            </ThemedText>
            </View>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
    formInput: {
        marginVertical:20,
        height:"100%"
    },
    formViewDescription:{
        lineHeight:18,
        textDecorationLine:"none",
        letterSpacing:0,
        fontSize:13
        
    },
    formViewContainer:{

        paddingVertical:15,
        display:"flex",
        flexDirection:"column",
        gap:5,
    },

    formView: {
        height: "23%",
        display: "flex",
        flexDirection:"row",
        paddingHorizontal:20,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10, 
        
    },
    formViewButton:{
        padding:5
    },
    rootContainer: {
        flex: 1,
        display: "flex",
        paddingVertical:10,
        paddingTop: 20,
        paddingHorizontal:20,
        height: "100%",
        width: "100%",
    },
    syncView: {
        position:"absolute",
        right: 0,
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})