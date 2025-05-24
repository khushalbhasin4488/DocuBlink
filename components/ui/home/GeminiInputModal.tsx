import { SizeBox } from '@/components/SizeBox';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSetGeminiKey } from '@/modules/ai/hooks/useSetGeminiKey';
import { useAiStore } from '@/store/aiSlice';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, TextInput, View } from 'react-native';
import { ThemedButton } from '../../ThemedButton';
import { ThemedText } from '../../ThemedText';
import { ThemedView } from '../../ThemedView';

interface InputModalProps {

  onClose: () => void;
}

export function GeminiInputModal({  onClose }: InputModalProps) {
  const colors = useThemeColor();
  const geminiApiKey = useAiStore(state=>state.geminiApiKey)
  const [input, setInput] = React.useState('');
  const {setGeminiKey, error , loading , message} = useSetGeminiKey()
  const handleSubmit = async () => {
    try{

      if (input.trim()) {
        await setGeminiKey(input.trim())
      }
    }
    catch(err){
      console.log(err)

    }
  };

  return (
    <Modal
      visible={geminiApiKey==null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText type="title" style={styles.title}>
            Welcome to Docublink
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Please enter your Gemini Key to continue 
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgrounds.card_surface,
                color: colors.text_colors.primary_text,
                borderColor: colors.button_colors.primary,
              },

            ]}

            placeholder="gemini key"
            placeholderTextColor={colors.text_colors.secondary_text}
            value={input}
            onChangeText={setInput}
            autoFocus
          />
          {error && 
            <ThemedView style={[{height: 30, width:"100%",
            borderRadius:9, padding:2,paddingHorizontal: 9, backgroundColor:colors.button_colors.danger}]}>
              <ThemedText type='defaultSemiBold' style={{color:colors.button_colors.neutral_default}}>
              {error}
              </ThemedText>
              </ThemedView>
          }
          <View style={styles.buttonContainer}>
            <ThemedButton
              type={loading ? "info" : "primary"}
              style={[styles.button]}
              onPress={handleSubmit}
              disabled = {loading}
            >
                <ThemedText  style={{ color: colors.button_colors.neutral_default }}>
                Continue
              </ThemedText>
              {loading && <SizeBox  size={10}/>}

              {loading && <ActivityIndicator size="small" color={colors.button_colors.primary}/>}
            </ThemedButton>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
    display:"flex",
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center",
    gap: 10,
    width: '100%',
    marginTop:10,
  },
}); 