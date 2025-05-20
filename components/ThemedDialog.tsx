import { useThemeColor } from "@/hooks/useThemeColor"
import { StyleSheet } from "react-native"
import { Dialog } from "react-native-simple-dialogs"
import { ThemedButton } from "./ThemedButton"
import { ThemedText } from "./ThemedText"
import { ThemedView } from "./ThemedView"


type ThemedDialogProps = {
    visible: boolean
    setVisible: (x: boolean) => void
    children?: React.ReactNode
    style?: any
    cancelTitle?: string
    confirmTitle?: string
    description?: string

}
export const ThemedDialog = ({ visible, setVisible, description,  style, cancelTitle, confirmTitle,  ...otherProps }: ThemedDialogProps) => {
    const colors = useThemeColor()
    return (
            <Dialog
                    dialogStyle={[{ backgroundColor: colors.backgrounds.main_background, borderRadius: 10}, style]}
                    visible={visible}
                    onTouchOutside={() => setVisible(false)}
                    contentInsetAdjustmentBehavior="automatic"
                    onRequestClose={() => setVisible(false)}>
                     
                        <ThemedText type="defaultSemiBold" style={styles.dialogContainer}>
                            <ThemedView >

                            <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.primary }}>
{description}
                            </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.optionContainer}>

                            <ThemedButton type="neutral_default" style={{width:"47%"}} onPress={() => setVisible(false)}>
                                <ThemedText type="defaultSemiBold">
                                    {cancelTitle}
                                </ThemedText>
                            </ThemedButton>
                            <ThemedButton type="danger" style={{width:"47%"}} onPress={() => setVisible(false)}>
                                <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.neutral_default }}>
                                    {confirmTitle}
                                </ThemedText>
                            </ThemedButton>
                            </ThemedView>
                        </ThemedText>
                </Dialog>
    )
}
const styles = StyleSheet.create({
    dialogContainer: {
        display: "flex",
        flexDirection: "column",
        alignContent:"center",
        alignItems:"center",
        height:80,
        width: "100%",
    },
    optionContainer:{
        flexDirection:"row",
        width:"100%",
       justifyContent:"space-around",
       paddingVertical:20, 
        backgroundColor:"transparent",
    }
})