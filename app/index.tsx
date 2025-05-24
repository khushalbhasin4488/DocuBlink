import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { handleGoogleSignIn } from "@/modules/firebase/utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const colors = useThemeColor();
  
  const onSignInClick = async () => {
    try {
      await handleGoogleSignIn();
      router.replace("/(logged-in)/(tabs)");
    } catch(err) {
      console.error("Error during Google Sign-In: ", err);
    }
  }

  return (
    <ThemedView style={{ ...styles.rootContainer }}>
      <View style={styles.hedingView}>
        <ThemedText type="title" style={{ fontWeight: "800" }}>Docublink</ThemedText>
        <ThemedText type="subtitle" style={{ color: colors.text_colors.secondary_text }}>Your details, everywhere - instantly</ThemedText>
      </View>

       <View style={styles.buttonView}>
        <ThemedButton style={{ ...styles.container }} type="neutral_default" onPress={onSignInClick}>
          <ThemedText style={{ color: colors.text_colors.primary_text }} type="subtitle">SignIn
          </ThemedText>

          <View style={{ paddingLeft: 8 }}>
            <Ionicons name="logo-google" size={18} />
          </View>
          {/* <Ionicons name="log-in" size={32} color={colors.button_colors.primary} /> */}
        </ThemedButton>
        {/* <ThemedButton style={{ ...styles.container}} type="neutral_default" onPress={googleSignIn}>
          <ThemedText style={{ color:colors.text_colors.primary_text}} type="subtitle">Signup 

          </ThemedText>
        </ThemedButton>
    */}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10

  },
  rootContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 150,
  },
  text: {
    fontSize: 20,
  },
  hedingView: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    display: "flex",
    gap: 10,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
})

