import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CollegeScreen } from "@/components/ui/documents/CollegeScreen";
import { GeneralScreen } from "@/components/ui/documents/GeneralScreen";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

export default function DocumentsScreen() {
    const [currentPage, setCurrentPage] = useState(0);

    const colors = useThemeColor()
    return (
        <ThemedView style={{flex: 1, backgroundColor: colors.backgrounds.main_background}}>
            <ThemedView style={styles.topView}>
                <ThemedButton style={[
                    styles.button,
                    {
                        backgroundColor:
                            currentPage == 0 ? colors.button_colors.primary
                                : colors.button_colors.neutral_default
                    },
                ]} type="danger" onPress={() => setCurrentPage(0)}>
                    <ThemedText type="defaultSemiBold" style={{
                        color: currentPage == 0 ? colors.button_colors.neutral_default
                            : colors.button_colors.primary
                    }}>
                        General
                    </ThemedText>

                </ThemedButton>
                <ThemedButton style={[
                    styles.button,
                    {
                        backgroundColor:
                            currentPage == 1 ? colors.button_colors.primary
                                : colors.button_colors.neutral_default
                    },
                ]} type="danger" onPress={() => setCurrentPage(1)}>
                    <ThemedText type="defaultSemiBold" style={{
                        color: currentPage == 1 ? colors.button_colors.neutral_default
                            : colors.button_colors.primary
                    }}>
                        College
                    </ThemedText>

                </ThemedButton>

            </ThemedView>
            <PagerView
                style={styles.pagerView}
                initialPage={currentPage}
                key={currentPage}
                onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
                <GeneralScreen key="0"/>
                <CollegeScreen key="1"/>
            </PagerView>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
    topView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        gap: 12,
        alignItems: "center",
    },
    button: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    }
});