import { useColorScheme } from "@/hooks/useColorScheme";
import { useLoadStates } from "@/modules/secure-storage/hooks/useLoadStates";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { PortalProvider } from '@gorhom/portal';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
})

SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  let colorScheme = useColorScheme();

  const { loadStates, loading} = useLoadStates()
  useEffect(()=>{
    const checkAuthentication = async () => {
      try {
        // Check if user is authenticated
        const user =  GoogleSignin.getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
          await loadStates();
          router.replace("/(logged-in)/(tabs)")
        } else {
          setIsAuthenticated(false);
          router.replace("/");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        router.replace("/");
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync()
        
      }
    };
    checkAuthentication();
  },[])
  




  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <SafeAreaView style={{flex:1}}>
          <ThemeProvider value={colorScheme=="dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(logged-in)" />
            </Stack>
          </ThemeProvider>
        </SafeAreaView>
        <Toasts/>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
