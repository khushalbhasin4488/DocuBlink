
import { useThemeColor } from '@/hooks/useThemeColor';
import { View, type ViewProps } from 'react-native';


export type ThemedViewProps = ViewProps & {
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const colors = useThemeColor()
  return <View style={[{backgroundColor: colors.backgrounds.main_background},style]} {...otherProps} />;
}
