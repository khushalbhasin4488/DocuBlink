import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
type UploadingModalProps = {
  onClose: () => void;
  visible: boolean
}
export function UploadingModal({ onClose, visible }: UploadingModalProps) {
  const [input, setInput] = useState('')
  const handleUpload = async ()=>{
  }
  return <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>

      <ThemedView style={styles.modalContent}>
        <ThemedButton type="info" style={styles.crossbtn}>
          <Ionicons name="close" size={20} color="white" onPress={onClose} />
        </ThemedButton>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          Upload Your Resume
        </ThemedText>
        <ThemedButton
          type="primary"
          style={styles.button}
          onPress={handleUpload}
        >
          <Ionicons name="cloud-upload-outline" size={20} color="white" />
        </ThemedButton>
      </ThemedView>
    </View>
  </Modal>

}


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: '100%',
    marginTop: 10,
  },
  crossbtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  }
})