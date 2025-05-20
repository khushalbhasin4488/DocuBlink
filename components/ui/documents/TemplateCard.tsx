import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dimensions, Image, Pressable, StyleSheet, ViewProps } from "react-native";

type TemplateCardProps = ViewProps & { 
    image?: string;
    title: string;
    description: string;
    onPress: () => void;
};

const { width: screenWidth } = Dimensions.get('window');
const CARD_GAP = 16; // Gap between cards
const CONTAINER_PADDING = 16; // Padding of the container
const CARD_WIDTH = (screenWidth - (CONTAINER_PADDING * 2) - CARD_GAP) / 2;

export const TemplateCard = ({ image, title, description, onPress, style, ...otherProps}: TemplateCardProps) => {
    const colors = useThemeColor();
    
    return (
        <Pressable 
            onPress={onPress}
            style={({ pressed }) => [
                styles.pressableContainer,
                pressed && { opacity: 0.9 }
            ]}
        >
            <ThemedView 
                style={[
                    styles.cardStyle, 
                    {
                        backgroundColor: colors.backgrounds.card_surface,
                    },
                    style
                ]} 
                {...otherProps}
            >
                <ThemedView style={styles.imageContainer}>
                    {image ? (
                        <Image 
                            source={{uri: image}} 
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <ThemedView style={[styles.image, styles.placeholderImage]} />
                    )}
                </ThemedView>
                
                <ThemedView style={styles.contentContainer}>
                    <ThemedText 
                        type="defaultSemiBold" 
                        style={styles.title}
                        numberOfLines={1}
                    >
                        {title}
                    </ThemedText>
                    <ThemedText 
                        type="default" 
                        style={styles.description}
                        numberOfLines={2}
                    >
                        {description}
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        width: CARD_WIDTH,
    },
    cardStyle: {
        height: 200,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        height: '60%',
        width: '100%',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        backgroundColor: '#E1E1E1',
    },
    contentContainer: {
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        opacity: 0.8,
        lineHeight: 16,
    }
});