import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FIREBASE_DB } from "@/firebaseConfig";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { StyleSheet, View } from "react-native";


GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_ID,
  scopes: ['profile', 'email'],
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
})

export default function Index() {
  const router = useRouter();
  const colors = useThemeColor()
  const handleGoogleSignIn = async () => {
    try{

      // check if users' device has google play services
      await GoogleSignin.hasPlayServices();
      
      // initiates signIn process
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      if (userInfo.data?.user.email) {
        let doc = await addDoc(collection(FIREBASE_DB, "users"), {
          id: userInfo.data?.user.id,
          email: userInfo.data?.user.email,
          name: userInfo.data?.user.name,
          photo: userInfo.data?.user.photo,
          createdAt: new Date(),
          
        })
        console.log("user inserted in firebase successfully")
        router.replace("/(logged-in)/(tabs)")
      }
    }
    catch(err){
      console.log("error in sigin " , err)
    }
  
  };
  return (
    <ThemedView style={{ ...styles.rootContainer }}>
      <View style={styles.hedingView}>
        <ThemedText type="title" style={{ fontWeight: "800" }}>Docublink</ThemedText>

        <ThemedText type="subtitle" style={{ color: colors.text_colors.secondary_text }}>Your details, everywhere - instantly</ThemedText>
      </View>
      <View style={styles.buttonView}>
        <ThemedButton style={{ ...styles.container }} type="neutral_default" onPress={handleGoogleSignIn}>
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
  }
})
