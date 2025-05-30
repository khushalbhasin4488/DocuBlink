import { useColorScheme } from "@/hooks/useColorScheme";
import { PortalProvider } from '@gorhom/portal';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_ID,
  scopes: ['profile', 'email'],
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
})

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string>("(logged-in)");
  let colorScheme = useColorScheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser =  GoogleSignin.getCurrentUser();
        
        setInitialRoute(currentUser?.idToken ? "(logged-in)" : "index");
      } catch (error) {
        console.error("Error checking auth state:", error);
        setInitialRoute("index");
      }
    };
    checkAuth();
  }, []);

  if (!initialRoute) {
    return null; // Or a loading screen
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
      <SafeAreaView style={{flex:1}}>
          <ThemeProvider value={colorScheme=="dark" ? DarkTheme : DefaultTheme}>
            <Stack initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="test/TestPage" />
              <Stack.Screen name="(logged-in)" />
            </Stack>
          </ThemeProvider>
      </SafeAreaView>
        </PortalProvider>
    </GestureHandlerRootView>
  );
}
