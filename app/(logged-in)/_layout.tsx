import { ThemedView } from "@/components/ThemedView";
import { GeminiInputModal } from "@/components/ui/home/GeminiInputModal";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLoadStates } from "@/modules/secure-storage/hooks/useLoadStates";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AuthenticatedLayout() {
  const colors = useThemeColor();
  const { loadStates } = useLoadStates()
  useEffect(() => {
    loadStates();
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.rootContainer}>
        <GeminiInputModal onClose={() => { }} />

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.button_colors.primary,
            tabBarInactiveTintColor: colors.text_colors.secondary_text,
            tabBarStyle: {
              backgroundColor: colors.backgrounds.main_background,
              height: 60,
              elevation: 0,
            },
            tabBarItemStyle: {
              paddingVertical: 4,
              borderTopColor: colors.text_colors.tertiary_text,
              borderTopWidth: 1,
              height: 44,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 4,
            }
          }}
        >
          <Tabs.Screen
            name="(tabs)/index"
            options={{
              headerShown: false,
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(tabs)/documents"
            options={{
              headerShown: false,
              title: "Documents",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="document" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(tabs)/profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </ThemedView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgrounds.main_background,
  },
  rootContainer: {
    flex: 1,
    width: "100%",
  },
});