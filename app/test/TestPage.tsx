import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { WebView } from "react-native-webview";
import { getGeminiCompletions } from "../api/geminiClient";
import { usePrompt } from "../hooks/usePrompt";
import { useScripts } from "../hooks/useScripts";
import { getFormhtml } from "../services/getFormhtml";

export default function TestPage() {
  const [webviewKey, setWebviewKey] = useState(0);
  const [formUrl, setFormUrl] = useState('');
  const [cookies, setCookies] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string>(useScripts("get-cookies"));
  const [showWebView, setShowWebView] = useState(false);
  const [formhtml, setformhtml] = useState<string | null>(null)
  const handleAutofill = () => {
    console.log("formurl", formUrl);
    if (!formUrl) return Alert.alert('Enter a valid URL');

    setLoading(true);
    setShowWebView(true);
    setLoading(false);
  };


  const onMessage = (event:
    {
      nativeEvent: {
        data: string;
      };
    }
  ) => {
    const receivedCookies = event.nativeEvent.data;
    setCookies(receivedCookies);
    console.log('Cookies received:', receivedCookies);
  };
  const handleFetchFormHTML = async () => {
    console.log("fetching form html")
    if (formhtml || !formUrl || !cookies) {
      return
    }
    let data = await getFormhtml(formUrl, cookies)
    setformhtml(data)

    let prompt = usePrompt("generateEmbeddingJS", {
      formhtml: data,
    })
    let script = await getGeminiCompletions(prompt)
    console.log("response", script)
    setScript(script)
  }

  useEffect(() => {
    if (cookies) {
      handleFetchFormHTML()
    }

  }, [cookies])

  useEffect(() => {
    if (script) {
      setWebviewKey(webviewKey + 1)
    }
  }
    , [script]);
  return (
    <View style={{ flex: 1 }}>
      {!showWebView ? (
        <View style={styles.container}>
          <TextInput
            placeholder="Enter Google Form URL"
            style={styles.input}
            onChangeText={setFormUrl}
            value={formUrl}
          />
          <Button title="Autofill Form" onPress={handleAutofill} />
          {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}
        </View>
      ) : (
        <WebView
          source={{ uri: formUrl }}
          injectedJavaScript={script}
          onMessage={onMessage}
          key={webviewKey}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
      {cookies && (
        <View style={styles.cookiesContainer}>
          <TextInput editable={false} multiline numberOfLines={4} value={cookies} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  cookiesContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});