import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CustomCarousel } from "@/components/ui/home/CustomCarousel";
import { DataDrawer, DataDrawerRef } from "@/components/ui/home/DataDrawer";
import { GoogleFormInput } from "@/components/ui/home/GoogleFormInput";
import { SyncSwitch } from "@/components/ui/home/SyncSwitch";
import { scripts } from "@/constants/scripts";
import { usePrompt } from "@/hooks/usePrompt";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getGeminiCompletions } from "@/services/geminiClient";
import { getFormhtml } from "@/services/getFormhtml";
import { useAiStore } from "@/store/aiSlice";
import { useFormStore } from "@/store/formSlice";
import { useUserDataStore } from "@/store/userSlice";
import { PopulatePromptWithUserInfo } from "@/utils/populatePromptWithUserInfo";
import { toast } from '@backpackapp-io/react-native-toast';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Index() {
    const{ geminiApiKeyState} = useAiStore()
    const colors = useThemeColor()
    const drawerRef = useRef<DataDrawerRef>(null);
    const {setformhtml,  formhtml, cookies, script, webViewKey,setWebViewKey, setCookies, setFormUrl, showWebView, setShowWebView, formUrl, setScript, canReload, setCanReload
     } = useFormStore()
    const { getObjectKeys , getUserInfo} = useUserDataStore();
    const [currentUrl, setCurrentUrl] = useState<string>("");
    // Simplified - no complex auth logic
    
    const handleAddManually = () => {
        drawerRef.current?.present();
    };

    const handleShowSoon = () => {
        
           toast("Comming Soon!", {
                styles: {
                    indicator: {
                        backgroundColor: colors.button_colors.primary,
                    }, 
                    view: {
                        backgroundColor: colors.button_colors.neutral_default,
                        borderWidth:1,
                        borderColor: colors.button_colors.primary,
                        borderRadius:16
                    },
                    text: {
                        color: colors.text_colors.primary_text,
                        fontWeight:"bold"
                    },
                    pressable: {
                        backgroundColor: colors.button_colors.primary,
                        borderRadius: 20,
                    }
                },
                duration: 2000,
            }); 
        }

    const onMessage = (event: { nativeEvent: { data: string; }; }) => {
        const receivedCookies = event.nativeEvent.data;
        console.log('Received cookies from WebView:', receivedCookies);
        
        if (receivedCookies && receivedCookies.trim() !== '') {
            console.log('Setting cookies for form processing');
            setCookies(receivedCookies);
        }
    };

    const handleCloseWebView = () => {
        setShowWebView(false);
        setformhtml(null)
        setScript(`let timer = setTimeout(() => {    
            window.location.href = ${formUrl};
            }
            , 1000);
            window.addEventListener("beforeunload", () => {
                clearTimeout(timer);
                });`);
                setFormUrl("")
        setCanReload(true);
    };

    const handleOpenInBrowser = async () => {
        if (formUrl) {
            try {
                await Linking.openURL(formUrl);
            } catch (err) {
                console.error('Error opening URL:', err);
            }
        }
    };

    // Simplified logout - just clear data

    const handleNavigationStateChange = (navState: any) => {
        setCurrentUrl(navState.url);
        console.log('Navigation to:', navState.url);
    };
    const handleFetchFormHTML = async () => {
        console.log("fetching form html")
        console.log("Debug values:", { 
            formhtml: !!formhtml, 
            formUrl: formUrl, 
            cookies: !!cookies,
            cookiesLength: cookies?.length || 0
        })
        if(formhtml || !formUrl || !cookies){
            console.log("Skipping fetch - conditions not met:", {
                hasFormhtml: !!formhtml,
                missingFormUrl: !formUrl,
                missingCookies: !cookies
            })
            return
        }
        let data = await getFormhtml(formUrl, cookies)
        if(!data){
            console.error("Failed to fetch form HTML")  
        }
        setformhtml(data)

        const availableFields = getObjectKeys().filter(key => 
            !key.startsWith('set') && 
            !key.startsWith('get') && 
            key !== 'reset' && 
            key !== 'key'
        );
        console.log(availableFields)
        let prompt = usePrompt("generateEmbeddingJS", {
            formhtml: data,
            UserObjectKeys: JSON.stringify(availableFields),
        })
        if(!geminiApiKeyState){
            {
        
                toast("Reset Gemini Api Key !", {
                     styles: {
                         indicator: {
                             backgroundColor: colors.button_colors.primary,
                         }, 
                         view: {
                             backgroundColor: colors.button_colors.neutral_default,
                             borderWidth:1,
                             borderColor: colors.button_colors.primary,
                             borderRadius:16
                         },
                         text: {
                             color: colors.text_colors.primary_text,
                             fontWeight:"bold"
                         },
                         pressable: {
                             backgroundColor: colors.button_colors.primary,
                             borderRadius: 20,
                         }
                     },
                     duration: 2000,
                 }); 
             }
             return
        }
    
        let script = await getGeminiCompletions(prompt, geminiApiKeyState)
        if(!script){
               console.error("Failed to generate script from Gemini completions")
            return
        }
        let populated_script = PopulatePromptWithUserInfo(script,getUserInfo() )
        console.log("response", populated_script)
        
        // Set the form-filling script - it will be injected into the current form
        setScript(populated_script)
        console.log("Form-filling script ready and will be injected")
    }

    useEffect(()=>{
        console.log("useEffect [cookies] triggered:", { 
            cookies: !!cookies, 
            cookiesValue: cookies,
            cookiesLength: cookies?.length || 0
        })
        if(cookies){
            console.log("Cookies exist, calling handleFetchFormHTML")
            handleFetchFormHTML()
        } else {
            console.log("No cookies, skipping handleFetchFormHTML")
        }
    },[cookies])
    useEffect(()=>{
        if(script && script.trim() !== ""){
            console.log('Script changed, updating WebView key:', webViewKey + 1);
            setWebViewKey(webViewKey+1)
        }
    },[script])

    const getCookiesScript = scripts["get-cookies"];

    return (
        <ThemedView style={styles.rootContainer}>
            {showWebView && formUrl &&
                <View style={styles.webViewContainer}>
                    <View style={styles.webViewButtons}>
                        <TouchableOpacity 
                            style={styles.browserButton} 
                            onPress={handleOpenInBrowser}
                        >
                            <Ionicons name="open-outline" size={24} color={colors.text_colors.primary_text} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={handleCloseWebView}
                        >
                            <Ionicons name="close-circle" size={32} color={colors.text_colors.primary_text} />
                        </TouchableOpacity>
                    </View>
                    <WebView
                        style={styles.WebViewStyle}
                        source={{ uri: formUrl }}
                        injectedJavaScript={script || getCookiesScript}
                        onMessage={onMessage}
                        onNavigationStateChange={handleNavigationStateChange}
                        onError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            console.warn('WebView error:', nativeEvent);
                        }}
                        onHttpError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            console.warn('WebView HTTP error:', nativeEvent);
                        }}
                        onLoadEnd={() => {
                            console.log('WebView load ended');
                        }}
                        key={webViewKey}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        sharedCookiesEnabled={true}
                        thirdPartyCookiesEnabled={true}
                    />
                </View>
            }
            <View style={styles.syncView}>
                <ThemedText type="defaultSemiBold">sync</ThemedText>
                <SyncSwitch />
            </View>
            <View>
                <ThemedText type="subtitle">Docublink</ThemedText>
            </View>
            <ThemedView style={styles.formViewContainer}>
                <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.primary }}>
                    QuickForm
                </ThemedText>
                <GoogleFormInput />
                <ThemedText type="default" style={styles.formViewDescription} >
                    ⓘ save your information to fill in google forms automatically .
                </ThemedText>
            </ThemedView>

                <CustomCarousel images={["@/assets/images/carousel-image1.png", "@/assets/images/carousel-images.png"]} />

            <ThemedView style={styles.uploadingContainer}>
                <ThemedView style={{ ...styles.uploadCard, width: "50%", backgroundColor: colors.button_colors.primary }} onTouchEnd={handleShowSoon}>
                    <Ionicons name="document-text" size={50} color={colors.button_colors.neutral_default} />
                    <ThemedText  type="defaultSemiBold" style={{ color: colors.button_colors.neutral_default }}>
                        Add by uploading
                    </ThemedText>
                </ThemedView>
                <DataDrawer ref={drawerRef}>
                    <ThemedView
                        style={[{ backgroundColor: colors.button_colors.primary }, styles.uploadCard]}
                        onTouchEnd={handleAddManually}
                    >
                        <MaterialIcons name="edit-document" size={50} color={colors.button_colors.neutral_default} />
                        <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.neutral_default }}>
                            Add manually
                        </ThemedText>
                    </ThemedView>
                </DataDrawer>
            </ThemedView>
            <ThemedView style={styles.bottomContainer}>

                <ThemedText type="defaultSemiBold" style={{ color: colors.button_colors.primary }} onPress={() => { router.push("/(logged-in)/(tabs)/profile") }}>
                    Remove your details
                </ThemedText>
                <Ionicons name="arrow-forward" size={18} color={colors.button_colors.primary} onPress={() => { router.push("/(logged-in)/(tabs)/profile") }} />
            </ThemedView>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
    formInput: {
        height: 43,
    },
    formViewDescription: {
        lineHeight: 18,
        textDecorationLine: "none",
        letterSpacing: 0,
        fontSize: 13,
    },
    formViewContainer: {
        height: "20%",
        paddingVertical: 15,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },

    formView: {
        height: "40%",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,

    },
    formViewButton: {
        padding: 5
    },
    uploadingContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    uploadCard: {
        height: 100,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
        padding: 10,
    },
    rootContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingVertical: 10,
        paddingTop: 20,
        paddingHorizontal: 20,
        height: "100%",
        width: "100%",
    },
    syncView: {
        position: "absolute",
        right: 0,
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",

    },
    webViewContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'white',
    },
    WebViewStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    webViewButtons: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10000,
        flexDirection: 'row',
        gap: 10,
    },
    closeButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
    },
    browserButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
    },
    logoutButton: {
        padding: 8,
        borderRadius: 20,
    },
})