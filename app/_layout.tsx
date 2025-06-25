import { credentials } from "@/credentials";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLoadStates } from "@/modules/secure-storage/hooks/useLoadStates";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { PortalProvider } from '@gorhom/portal';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from 'react';
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
GoogleSignin.configure(credentials)

SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
  const router = useRouter();
  let colorScheme = useColorScheme();

  const { loadStates, loading} = useLoadStates()
  useEffect(()=>{
    const checkAuthentication = async () => {
      try {
        // Check if user is authenticated
        const user =  GoogleSignin.getCurrentUser();
        if (user) {
          await loadStates();
          router.replace("/(logged-in)/(tabs)")
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.replace("/");
      } finally {
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
