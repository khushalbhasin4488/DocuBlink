import { useThemeColor } from "@/app/hooks/useThemeColor";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";


export type ThemedbuttonProps = PressableProps &  {
    type: "primary" |  "hollow" | "danger" | "secondary"
}
export function ThemedButton({type,style,  ...props}: ThemedbuttonProps) {
  return (
    <Pressable
    style={[
      styles.button,
      type === "hollow" ? styles.hollow : type === "danger" ? styles.danger : {backgroundColor: useThemeColor({}, type)}, 
      typeof style === 'function' ? {} : style
    ]}
      {...props}
    >
      <ThemedText type="subtitle">
        {typeof props.children === 'function' ? props.children({
          pressed: false,
          hovered: false
      }) : props.children}
      </ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 50,
        borderRadius: 10,
    }, 
    hollow: {
        backgroundColor: "blue",
    }, 
    danger: {
        backgroundColor: "red",
    }
})