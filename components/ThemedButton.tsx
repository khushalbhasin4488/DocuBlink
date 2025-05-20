import { Colors } from "@/constants/Colors";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedbuttonProps = PressableProps &  {
    type: keyof typeof Colors.button_colors; 
    style?: any;
}
export function ThemedButton({type ,style,  ...props}: ThemedbuttonProps) {
  return (
    <Pressable
    style={[
      styles.button,
      {backgroundColor: Colors.button_colors[type]},
      style,
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
      padding: 10,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
        fontFamily: "Inter",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textDecorationColor: "black",
        textAlignVertical: "center",
    }, 
})