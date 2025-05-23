import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
export default function RootLayout() {
  let colorScheme = useColorScheme()
  return (
    <SafeAreaView style={{flex: 1}}>
    <ThemeProvider value={colorScheme=="dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="index"  >
        <Stack.Screen name="index"  options={{ headerShown: false }}/>
        <Stack.Screen name="test/TestPage" options={{ headerShown: false }}/>
        <Stack.Screen name="(logged-in)" options={{ headerShown: false }}/>
      </Stack>
    </ThemeProvider>
    </SafeAreaView>
  )
}
