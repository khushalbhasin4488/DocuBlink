import { useThemeColor } from "@/hooks/useThemeColor"
import { StyleSheet, TextInput, TextInputProps } from "react-native"

type ThemedTextInputProps = TextInputProps & {
    value: string
    setValue: (x: string) => void
    placeholder: string
}

export const ThemedTextInput = ({value, setValue, placeholder, style, ...otherProps}: ThemedTextInputProps) => {
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
              style
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.text_colors.secondary_text}
            value={value}
            onChangeText={setValue}
            autoFocus
            {...otherProps}
          />
    )
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
})