import { SizeBox } from "@/components/SizeBox";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedDialog } from "@/components/ThemedDialog";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DetailsGrid } from "@/components/ui/profile/DetailsGrid";
import { useThemeColor } from "@/hooks/useThemeColor";
import { handleGoogleLogout } from "@/modules/firebase/utils/auth";
import { useDeleteStorage } from "@/modules/secure-storage/hooks/useDeleteStorage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { StackActions } from '@react-navigation/native';
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

export default function ProfileScreen() {
    const colors = useThemeColor()
    const user = GoogleSignin.getCurrentUser()
    const [deleteDataVisible, setDeleteDataVisible] = useState(false)
    const [logoutVisible, setLogoutVisible] = useState(false)
    const [showEditGrid, setShowEditGrid] = useState(false)
    const [loggedOut, setLoggedOut] = useState(false)
    const [deleteData, setDeleteData] = useState(false)

    const navigation = useNavigation()
    const {deleteStorage} = useDeleteStorage()
    const handleLogoutConfirmed = async () => {
        try {

            await handleGoogleLogout()
            setLoggedOut(false)
            await deleteStorage()
            navigation.dispatch(
                StackActions.replace("index")
            )
        }
        catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        if (loggedOut) {
            console.log("User logged out");
            handleLogoutConfirmed();

        }
    }
        , [loggedOut]);

    useEffect(() => {
        if (deleteData) {
            // Perform delete data action here
            console.log("User data deleted");
            setDeleteData(false);
        }
    }
        , [deleteData]);

    return (
        <ScrollView style={[styles.rootContainer, { backgroundColor: colors.backgrounds.main_background }]}>
            <ThemedView style={styles.topContainer}>
                {user?.user.photo && <Image source={{ uri: user?.user.photo }} style={styles.profileImage} />}
                <ThemedText type="subtitle">
                    {user?.user.name}
                </ThemedText>
            </ThemedView>
            <SizeBox size={20} />
            <ThemedDialog setVisible={setLogoutVisible} visible={logoutVisible} result={loggedOut} setresult={setLoggedOut} cancelTitle="Cancel" confirmTitle="Logout" description="Are you sure you want to logout" />

            <ThemedDialog setVisible={setDeleteDataVisible} visible={deleteDataVisible} result={deleteData} setresult={setDeleteData} cancelTitle="Cancel" confirmTitle="Delete" description="Are you sure you want to delete your data?" />


            <ThemedView style={styles.listContainer}>
                <ThemedButton type="neutral_default" style={[{
                    borderColor: colors.button_colors.primary,
                }, styles.listView]}
                    onPress={() => { setShowEditGrid(true) }}>
                    <ThemedText type="defaultSemiBold">
                        Edit Details
                    </ThemedText>
                </ThemedButton>
                {showEditGrid && <DetailsGrid />}
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
    topContainer: {
        display: "flex",
        width: "100%",
        height: "14%",
        zIndex: 50,
        alignItems: "center",

        flexDirection: "row",
        gap: 10,
    },
    profileImage: {
        height: 30,
        width: 30,
        borderRadius: 50,

    },
})