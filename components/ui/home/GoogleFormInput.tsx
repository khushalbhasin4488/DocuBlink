import { ThemedButton } from "@/components/ThemedButton"
import { ThemedTextInput } from "@/components/ThemedTextInput"
import { scripts } from "@/constants/scripts"
import { useThemeColor } from "@/hooks/useThemeColor"
import { useFormStore } from "@/store/formSlice"
import { toast } from "@backpackapp-io/react-native-toast"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"

export const GoogleFormInput = () => {
    const colors = useThemeColor()
    const { setWebViewKey, webViewKey, formUrl, setFormUrl, setLoading, setScript, setShowWebView } = useFormStore()
    
    const handleOnSubmitForm = async () => {
        if (!formUrl) {
            toast("Enter a valid google forms url", {
                styles: {
                    indicator: {
                        backgroundColor: colors.button_colors.primary,
                    },
                    view: {
                        backgroundColor: colors.button_colors.danger,
                        borderWidth: 1,
                        borderColor: colors.button_colors.primary,
                        borderRadius: 16
                    },
                    text: {
                        color: colors.button_colors.neutral_default,
                        fontWeight: "bold"
                    },
                    pressable: {
                        backgroundColor: colors.button_colors.primary,
                        borderRadius: 20,
                    }
                },
                duration: 2000,
            });
            return
        }
        setLoading(true);
        
        setScript(scripts["get-cookies"]);
        setShowWebView(true);
        setLoading(false);
    }

    return (
        <View style={styles.formView}>
            <ThemedTextInput 
                value={formUrl} 
                setValue={setFormUrl} 
                placeholder={"https://forms.google.com/abc"} 
                style={styles.formInput} 
            />
            <ThemedButton 
                type="neutral_default" 
                style={styles.formViewButton} 
                onPress={handleOnSubmitForm}
            >
                <Ionicons name="send" size={32} color={colors.button_colors.primary} />
            </ThemedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    formInput: {
        height: 43,
    },
    formView: {
        height: "40%",
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
})