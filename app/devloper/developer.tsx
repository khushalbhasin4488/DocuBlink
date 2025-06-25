import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Linking, StyleSheet, TouchableOpacity, View } from "react-native";

export default function DeveloperScreen() {
    const colors = useThemeColor();
    const router = useRouter();

    const handleLinkPress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <ThemedView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={colors.text_colors.primary_text} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Image
                    source={{ uri: 'https://avatars.githubusercontent.com/u/89948924?v=4' }}
                    style={styles.avatar}
                />
                <ThemedText type="title" style={styles.name}>Khushal Bhasin</ThemedText>
                <ThemedText type="default" style={styles.email}>khushalbhasin.wrk@gmail.com</ThemedText>
                <View style={styles.socialLinks}>
                    <TouchableOpacity onPress={() => handleLinkPress('https://github.com/coderkhushal')}>
                        <Ionicons name="logo-github" size={32} color={colors.text_colors.primary_text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLinkPress('https://www.linkedin.com/in/khushal-bhasin-78504a284')}>
                        <Ionicons name="logo-linkedin" size={32} color={colors.text_colors.primary_text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLinkPress('mailto:khushalbhasin.wrk@gmail.com')}>
                        <Ionicons name="mail" size={32} color={colors.text_colors.primary_text} />
                    </TouchableOpacity>
                </View>
            </View>
            <ThemedText style={styles.footerText}>Developed with ❤️ by Khushal Bhasin</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        marginBottom: 24,
        color: '#888',
    },
    socialLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    footerText: {
        textAlign: 'center',
        paddingBottom: 20,
        color: '#888',
        fontSize: 14,
    }
}); 