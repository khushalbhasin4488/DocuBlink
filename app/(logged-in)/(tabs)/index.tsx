import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { CustomCarousel } from "@/components/ui/home/CustomCarousel";
import { SyncSwitch } from "@/components/ui/home/SyncSwitch";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
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
            <ThemedView style={styles.formViewContainer}>
                <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.primary }}>
                    QuickForm
                </ThemedText>

                <View style={styles.formView}>

                    <ThemedTextInput value={formUrl} setValue={setFormUrl} placeholder={"https://forms.google.com/abc"} style={styles.formInput} />
                    <ThemedButton type="neutral_default" style={styles.formViewButton}>

                        <Ionicons name="send" size={32} color={colors.button_colors.primary} />
                    </ThemedButton>
                </View>
                <ThemedText type="default" style={styles.formViewDescription} >
                    ⓘ save your information to fill in google forms automatically .
                </ThemedText>
            </ThemedView>
           <CustomCarousel images={["https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg", "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"]} />
           
            <ThemedView style={styles.uploadingContainer}>
                <ThemedView style={{ ...styles.uploadCard, backgroundColor: colors.button_colors.primary }} onTouchEnd={()=>{}}>
                    <Ionicons name="document-text" size={50} color={colors.button_colors.neutral_default} />
                    <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.neutral_default }}>
                        Upload
                    </ThemedText>
                </ThemedView>
                <ThemedView style={[{ backgroundColor: colors.button_colors.primary }, styles.uploadCard]} onTouchEnd={()=>{}}>
                    <MaterialIcons name="edit-document" size={50} color={colors.button_colors.neutral_default} />
                    <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.neutral_default }}>
                        Add manually
                    </ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.bottomContainer}>

            <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.primary}} onPress={()=>{router.push("/(logged-in)/(tabs)/profile")}}>
                Update your details
            </ThemedText>
                <Ionicons name="arrow-forward"  size={18} color={colors.button_colors.primary} onPress={()=>{router.push("/(logged-in)/(tabs)/profile")}} />
        </ThemedView>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
    formInput: {
        marginVertical: 20,
        height:"100%",
    },
    formViewDescription: {
        lineHeight: 18,
        textDecorationLine: "none",
        letterSpacing: 0,
        fontSize: 13,
    },
    formViewContainer: {
        height: "15%",
        paddingVertical:15,
        margin:0,
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },

    formView: {
        height: "50%",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,

    },
    formViewButton: {
        padding: 5
    },
    uploadingContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,

    },
    uploadCard: {
        width: "50%",
        height: 100,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
        padding: 10,
    },

    rootContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingVertical: 10,
        paddingTop: 20,
        paddingHorizontal: 20,
        height: "100%",
        width: "100%",
    },
    syncView: {
        position: "absolute",
        right: 0,
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainer:{
        display:"flex",
        flexDirection:"row",
        marginTop: 20,
        alignItems:"center",

    }
})