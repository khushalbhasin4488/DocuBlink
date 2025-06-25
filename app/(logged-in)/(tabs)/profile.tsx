import { SizeBox } from "@/components/SizeBox";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedDialog } from "@/components/ThemedDialog";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DetailsGrid } from "@/components/ui/profile/DetailsGrid";
import { scripts } from "@/constants/scripts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { handleGoogleLogout } from "@/modules/firebase/utils/auth";
import { useDeleteStorage } from "@/modules/secure-storage/hooks/useDeleteStorage";
import { useFormStore } from "@/store/formSlice";
import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { StackActions } from '@react-navigation/native';
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
    const colors = useThemeColor()
    const user = GoogleSignin.getCurrentUser()
    const [deleteDataVisible, setDeleteDataVisible] = useState(false)
    const [deleteData, setDeleteData] = useState(false)
    const [logoutVisible, setLogoutVisible] = useState(false)
    const [loggedOut, setLoggedOut] = useState(false)
    const [geminiKeyDeleteVisible, setGeminiKeyDeleteVisible] = useState(false)
    const [geminiKeyDelete, setGeminiKeyDelete] = useState(false)
    const { reset: resetFormStore,webViewKey,setWebViewKey,setFormUrl, setScript , setShowWebView} = useFormStore()

    const handleInfoPress = () => {
        router.push('/devloper/developer');
    }
    const navigation = useNavigation()
    const {deleteStorage, deleteKey} = useDeleteStorage()
    const handleLogoutConfirmed = async () => {
        try {
            await handleGoogleLogout();
            setLoggedOut(false);
            await deleteStorage();
            resetFormStore();

            // Show the WebView and run the logout script
            setScript(scripts["logout-google-account"]);
            setShowWebView(true);

            // Optionally, after a delay, hide the WebView and navigate
            setTimeout(() => {
                setShowWebView(false);
            }, 1); // adjust delay as needed
            navigation.dispatch(StackActions.replace("index"));
        } catch (err) {
            console.error(err);
        }
    };
    const handleGeminiKeyDeletionConfirmed = async () => {
        try {
            console.log("here")
            await deleteKey("geminiApiKey")
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
            deleteStorage()
            console.log("User data deleted");
            setDeleteData(false);
        }
    }
        , [deleteData]);

    useEffect(()=>{
        if(geminiKeyDelete){
            handleGeminiKeyDeletionConfirmed()
            setGeminiKeyDelete(false)
            setGeminiKeyDeleteVisible(false)
        }
    },[geminiKeyDelete])    

    return (
        <ScrollView style={[styles.rootContainer, { backgroundColor: colors.backgrounds.main_background }]}>
            <ThemedView style={styles.topContainer}>
                <ThemedView style={{ flexDirection:"row", gap:10, }}>

                {user?.user.photo && <Image source={{ uri: user?.user.photo }} style={styles.profileImage} />}
                <ThemedText type="subtitle">
                    {user?.user.name}
                </ThemedText>
                </ThemedView>

                <TouchableOpacity onPress={handleInfoPress}>
                    <Ionicons name="information-circle-outline" size={24} color={colors.text_colors.primary_text} />
                </TouchableOpacity>
            </ThemedView>
            <SizeBox size={20} />
            <ThemedDialog setVisible={setLogoutVisible} visible={logoutVisible}  setresult={setLoggedOut} cancelTitle="Cancel" confirmTitle="Logout" description="Are you sure you want to logout?" />

            <ThemedDialog setVisible={setDeleteDataVisible} visible={deleteDataVisible}  setresult={setDeleteData} cancelTitle="Cancel" confirmTitle="Delete" description="Are you sure you want to delete your data?" />
            <ThemedDialog setVisible={setGeminiKeyDeleteVisible} visible={geminiKeyDeleteVisible}  setresult={setGeminiKeyDelete} cancelTitle="Cancel" confirmTitle="Delete" description="Are you sure you want to reset Gemini Key ?" />


            <ThemedView style={styles.listContainer}>
               
                {false && <ThemedButton type="neutral_default" style={[{
                    borderColor: colors.button_colors.primary,
                }, styles.listView]}
                    // onPress={() => { setShowEditGrid(true) }}>
                    onPress={() => {}}>
                    <ThemedText type="defaultSemiBold">
                        Edit Details
                    </ThemedText>
                </ThemedButton>}
                {false && <DetailsGrid />}

                <ThemedButton type="neutral_default" style={[{
                    borderColor: colors.button_colors.primary,
                    backgroundColor:colors.button_colors.primary
                }, styles.listView]} onPress={() => { setDeleteDataVisible(true) }}>
                    <ThemedText type="defaultSemiBold" style={{color:colors.button_colors.neutral_default}}>
                        Delete Data
                    </ThemedText>
                </ThemedButton>
                <ThemedButton type="neutral_default" style={[{
                    borderColor: colors.button_colors.primary,
                    backgroundColor:colors.button_colors.primary
                }, styles.listView]} onPress={() => { setGeminiKeyDeleteVisible(true) }}>
                    <ThemedText type="defaultSemiBold" style={{color:colors.button_colors.neutral_default}}>
                        Reset Gemini Key
                    </ThemedText>
                </ThemedButton>
                <ThemedButton type="neutral_default" style={[{
                    borderColor: colors.button_colors.primary,
                    backgroundColor:colors.button_colors.primary
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
        justifyContent: "space-between", 
        flexDirection: "row",
        gap: 10,
    },
    profileImage: {
        height: 30,
        width: 30,
        borderRadius: 50,

    },
})