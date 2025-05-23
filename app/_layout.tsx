import { useColorScheme } from "@/hooks/useColorScheme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  let colorScheme = useColorScheme()
  useEffect(()=>{

    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_ID,
      scopes: ['profile', 'email'], 
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: false,
      iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
    })
  },[])
  return (
    <SafeAreaView style={{flex: 1}}>
    <ThemeProvider value={colorScheme=="dark" ? DarkTheme : DefaultTheme}>
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="test/TestPage" options={{ headerShown: false }}/>
        <Stack.Screen name="(logged-in)" options={{ headerShown: false }}/>
      </Stack>
    </ThemeProvider>
    </SafeAreaView>
  )
}
