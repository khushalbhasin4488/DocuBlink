import { useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { WebView } from "react-native-webview";

export default function TestPage() {
  const [formUrl, setFormUrl] = useState('');
  const [script, setScript] = useState('');
  const [webviewKey, setWebviewKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = 'https://fab1-180-149-227-26.ngrok-free.app';
  const webviewRef = useRef(null);

  const handleAutofill = async () => {
    if (!formUrl) return Alert.alert('Enter a valid URL');

    try {
      setLoading(true);
      setWebviewKey(prev => prev + 1); // force reload WebView
      setScript("something")
    

    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong. Check logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!script ? (
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
          key={webviewKey}
          ref={webviewRef}
          source={{ uri: formUrl }}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          injectedJavaScript={`
    let timeout =setTimeout(() => {
      window.ReactNativeWebView.postMessage(document.cookie);
    }, 2000);  // Give some time for the page to load cookies
    true;
  `}
          onMessage={(event) => {
            const cookies = event.nativeEvent.data; // Cookies received here
            console.log('Cookies:', cookies);
          }}
        />
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
});