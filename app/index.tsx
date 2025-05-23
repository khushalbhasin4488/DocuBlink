import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
export default function Index() {
  const router = useRouter();
  const colors = useThemeColor()
  const GoogleLogin = async () => {
    // check if users' device has google play services
    await GoogleSignin.hasPlayServices();
  
    // initiates signIn process
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  };
  
  const googleSignIn = async () => {
    try {
      const response = await GoogleLogin();
  
      // retrieve user data
      const { idToken, user } = response.data ?? {};
      if (idToken) {
        console.log('User data', user);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }; 
  return (
    <ThemedView style={{ ...styles.rootContainer }}>
      <View style={styles.hedingView}>

        <ThemedText type="title" style={{fontWeight: "800"}}>Docublink</ThemedText>
        <ThemedText type="subtitle" style={{color: colors.text_colors.secondary_text}}>Your details, everywhere - instantly</ThemedText>

      </View>
      <View style={styles.buttonView}>
        <ThemedButton style={{ ...styles.container }} type="neutral_default" onPress={() => router.replace("/(logged-in)/(tabs)")}>
          <ThemedText style={{ color:colors.text_colors.primary_text}} type="subtitle">Login

          </ThemedText>
          {/* <Ionicons name="log-in" size={32} color={colors.button_colors.primary} /> */}
        </ThemedButton>
        <ThemedButton style={{ ...styles.container}} type="neutral_default" onPress={() => router.replace("/(logged-in)/(tabs)")}>
          <ThemedText style={{ color:colors.text_colors.primary_text}} type="subtitle">Signup 

          </ThemedText>
            {/* <Ionicons name="" size={32} color={colors.button_colors.primary} /> */}
        </ThemedButton>
        <GoogleSigninButton onPress={googleSignIn}/>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "80%",
    alignItems: 'center',
    justifyContent: 'center',
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
  }
})
