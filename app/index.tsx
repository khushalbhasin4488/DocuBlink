import { SizeBox } from "@/components/SizeBox";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { handleGoogleSignIn } from "@/modules/firebase/utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const colors = useThemeColor();

  const onSignInClick = async () => {
    try {
      await handleGoogleSignIn();
      router.replace("/(logged-in)/(tabs)");
    } catch (err) {
      console.error("Error during Google Sign-In: ", err);
    }
  }

  return (
    <ThemedView style={{ ...styles.rootContainer }}>
      <ThemedView style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/landing2.jpeg')}
          style={{ width: "100%", height: "100%", flex: 1 }}
        />
        <View style={styles.hedingView}>
          <ThemedText type="title" style={[styles.mainHeading, { backgroundColor:colors.backgrounds.main_background ,}]}>Docublink</ThemedText>
          <SizeBox size={20}/>
          <ThemedText type="subtitle" style={{ color: colors.text_colors.secondary_text , paddingTop: 10}}>Your details, everywhere - instantly</ThemedText>
        </View>
      </ThemedView>
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
    paddingBottom: 150,
  },
  text: {
    fontSize: 20,
  },
  hedingView: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    gap: 10,
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
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "70%",
  },
  mainHeading: {
    fontWeight: "800",
    position: "absolute",
    top: -20,
    width: "100%",
    textAlign: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20
  }
})

