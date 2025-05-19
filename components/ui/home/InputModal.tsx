import { useThemeColor } from '@/hooks/useThemeColor';
import { useAiStore } from '@/modules/ai/aiSlice';
import React from 'react';
import { Modal, StyleSheet, TextInput, View } from 'react-native';
import { ThemedButton } from '../../../components/ThemedButton';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';

interface InputModalProps {
  visible: boolean;
  onClose: () => void;
}

export function InputModal({ visible, onClose }: InputModalProps) {
  const colors = useThemeColor();
  const setGeminiInput  = useAiStore((state) => state.setGeminiInput);
  const [input, setInput] = React.useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      setGeminiInput(input.trim());
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
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
          <View style={styles.buttonContainer}>
            <ThemedButton
              type="primary"
              style={styles.button}
              onPress={handleSubmit}
            >
              <ThemedText style={{ color: colors.text_colors.primary_text }}>
                Continue
              </ThemedText>
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
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
}); 