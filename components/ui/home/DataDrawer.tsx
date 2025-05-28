import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { DataDrawerPage } from './DataDrawerPage';

export type DataDrawerRef = {
    present: () => void;
};

export const DataDrawer = forwardRef<DataDrawerRef, { children: React.ReactNode }>(
    ({ children }, ref) => {
        const bottomSheetModalRef = useRef<BottomSheetModal>(null);
        const snapPoints = React.useMemo(() => ['90%'], []);

        useImperativeHandle(ref, () => ({
            present: () => {
                bottomSheetModalRef.current?.present();
            },
        }));

        const handleSheetChanges = useCallback((index: number) => {
            console.log('handleSheetChanges', index);
        }, []);

        return (
            <ThemedView style={{flex: 1}}>
                {children}
                <Portal>
                    <BottomSheetModalProvider>
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                            style={styles.bottomSheet}
                            enablePanDownToClose
                            handleIndicatorStyle={styles.handleIndicator}
                            backgroundStyle={styles.bottomSheetBackground}
                        >
                            <BottomSheetView style={styles.contentContainer}>
                                <DataDrawerPage/>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                </Portal>
            </ThemedView>
        );
    }
);

const styles = StyleSheet.create({
    bottomSheet: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    bottomSheetBackground: {
        backgroundColor: Colors.button_colors.neutral_default,
        
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        
    },
    contentText: {
        fontSize: 18,
        fontWeight: '600',
    },
    handleIndicator: {
    backgroundColor:Colors.button_colors.primary,
        width: 40,
    },
});
