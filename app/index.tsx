import { IconSymbol } from "@/app-example/components/ui/IconSymbol.ios";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useThemeColor } from "./hooks/useThemeColor";
export default function Index() {
  const router = useRouter();
  return (
    <ThemedView style={{ ...styles.rootContainer }}>
      <View style={styles.hedingView}>

        <ThemedText type="title" >Docublink</ThemedText>
        <ThemedText type="subtitle"  >Your documents, your way</ThemedText>
      </View>
      <View style={styles.buttonView}>
        <ThemedButton style={{...styles.container, backgroundColor: useThemeColor({}, "text")}} type="secondary" onPress={() => router.push("/test/TestPage")}>
          <ThemedText style={{  color: useThemeColor({}, "textWhite") }} type="subtitle">Get Started
            
          </ThemedText>
        <IconSymbol name="arrowtriangle.right" size={20} color={useThemeColor({}, "textWhite")}/>
        </ThemedButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    display: "flex",
    width:"80%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 300,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
})
