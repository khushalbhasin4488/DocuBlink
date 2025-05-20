import { SizeBox } from "@/components/SizeBox";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedDialog } from "@/components/ThemedDialog";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DetailsGrid } from "@/components/ui/profile/DetailsGrid";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ProfileScreen() {
    const colors = useThemeColor()
    const [deleteDataVisible, setDeleteDataVisible] = useState(false)
    const [logoutVisible, setLogoutVisible] = useState(false)
    const [showEditGrid, setShowEditGrid] = useState(false)
    return (
        <ScrollView style={[styles.rootContainer, {backgroundColor:colors.backgrounds.main_background}]}>
            <ThemedText type="subtitle">
                John Doe
            </ThemedText>
            <SizeBox size={20} />
            <ThemedDialog setVisible={setLogoutVisible} visible={logoutVisible} cancelTitle="Cancel" confirmTitle="Logout" description="Are you sure you want to logout" />

            <ThemedDialog setVisible={setDeleteDataVisible} visible={deleteDataVisible} cancelTitle="Cancel" confirmTitle="Delete" description="Are you sure you want to delete your data?" />


            <ThemedView style={styles.listContainer}>
                <ThemedButton type="neutral_default" style={[{
                    borderColor: colors.button_colors.primary,
                }, styles.listView]}
                    onPress={() => { setShowEditGrid(true) }}>
                    <ThemedText type="defaultSemiBold">
                        Edit Details
                    </ThemedText>
                </ThemedButton>
                {showEditGrid && <DetailsGrid  />}
                <ThemedButton type="neutral_default" style={[{
                    borderColor: colors.button_colors.primary,
                }, styles.listView]} onPress={() => { setDeleteDataVisible(true) }}>
                    <ThemedText type="defaultSemiBold">
                        Delete Data
                    </ThemedText>
                </ThemedButton>

                <ThemedButton type="neutral_default" style={[{
                    borderColor: colors.button_colors.primary,
                }, styles.listView]}
                    onPress={() => { setLogoutVisible(true) }}>
                    <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.danger }}>
                        Logout
                    </ThemedText>

                </ThemedButton>
            </ThemedView>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    rootContainer: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        padding: 20,

    },
    listContainer: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: 10,
    },
    listView: {
        justifyContent: "flex-start",
        paddingLeft: 20,
        display: "flex",
        width: "100%",
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        gap: 10,
    },

})