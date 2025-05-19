import { useThemeColor } from "@/hooks/useThemeColor"
import { StyleSheet, TextInput } from "react-native"

export const ThemedTextInput = ({input, setInput}: {input: string,setInput: (x: string)=>void}) => {
    const colors = useThemeColor()
    return (
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgrounds.card_surface,
                color: colors.text_colors.primary_text,
                borderColor: colors.button_colors.primary,
              },
            ]}
            placeholder="gemini key"
            placeholderTextColor={colors.text_colors.secondary_text}
            value={input}
            onChangeText={setInput}
            autoFocus
          />
    )
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
})