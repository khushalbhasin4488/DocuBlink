import { useColorScheme } from "@/hooks/useColorScheme";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { PortalProvider } from '@gorhom/portal';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

import { Stack, useRouter } from "expo-router";
import React, { useState } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  let colorScheme = useColorScheme();



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <SafeAreaView style={{flex:1}}>
          <ThemeProvider value={colorScheme=="dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(logged-in)" />
                  <Stack.Screen name="test/TestPage" />
            </Stack>
          </ThemeProvider>
        </SafeAreaView>
        <Toasts/>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
