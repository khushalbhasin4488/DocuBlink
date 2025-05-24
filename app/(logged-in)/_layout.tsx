import { ThemedView } from "@/components/ThemedView";
import { GeminiInputModal } from "@/components/ui/home/GeminiInputModal";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AuthenticatedLayout() {
  const colors = useThemeColor();
  

  return (
    <SafeAreaView style={styles.safeArea}>
<ThemedView style={styles.rootContainer}>
  <GeminiInputModal onClose={()=>{}}  />
  
      <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.button_colors.primary,
            tabBarInactiveTintColor: colors.text_colors.secondary_text,
            tabBarStyle: {
              backgroundColor: colors.backgrounds.card_surface,
              paddingTop:10,
              paddingBottom:10
            },
          }}
        >
          <Tabs.Screen
            name="(tabs)/index"
            options={{
              headerShown:false,
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(tabs)/documents"
            options={{
              headerShown:false,
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