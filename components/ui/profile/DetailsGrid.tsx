import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

const tableData = {
    tableHead: ['Type', 'Value',  'Actions'],
    tableData: [
        ['Bitcoin', '$44,331',  ''],
        ['Ethereum', '$3000.9', ''],
        ['Tether', '$1', ''],
        ['BNB', '$413.44',  ''],
        ['USD Coin', '$1',  ''],
    ],
};

export const DetailsGrid = () => {
    const colors = useThemeColor()
    const [data, setData] = useState(tableData);
    const windowWidth = Dimensions.get('window').width;

    const handleEdit = (index: number) => {
        // TODO: Implement edit functionality
        console.log('Edit row:', index);
    };

    const handleDelete = (index: number) => {
        const newTableData = [...data.tableData];
        newTableData.splice(index, 1);
        setData({
            ...data,
            tableData: newTableData,
        });
    };

    const renderActionButtons = (index: number) => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, {backgroundColor:colors.button_colors.info}]}
                onPress={() => handleEdit(index)}
            >
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {backgroundColor:colors.button_colors.danger}]}
                onPress={() => handleDelete(index)}
            >
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const tableDataWithButtons = data.tableData.map((row, index) => [
        ...row.slice(0, -1),
        renderActionButtons(index),
    ]);

    return (
        <ScrollView style={styles.scrollContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={[styles.container, { minWidth: windowWidth }]}>
                    <Table borderStyle={{ borderWidth: 4, borderColor: colors.button_colors.primary }}>
                        <Row 
                            data={data.tableHead} 
                            style={[styles.head, {backgroundColor: colors.button_colors.primary}]} 
                            textStyle={styles.headText}
                            widthArr={[150, 150, 200]}
                        />
                        <Rows 
                            data={tableDataWithButtons} 
                            textStyle={styles.text}
                            widthArr={[150, 150, 200]}
                        />
                    </Table>
                </View>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    container: { 
        padding: 10,
        justifyContent: 'center',
    },
    head: {
        height: 44,
        width: '100%',
    },
    headText: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: 'white',
        paddingHorizontal: 10,
    },
    text: { 
        margin: 6, 
        fontSize: 16,
        fontWeight: 'bold', 
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        minWidth: 70,
    },
    editButton: {
        backgroundColor: '#2196F3',
    },
    deleteButton: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});