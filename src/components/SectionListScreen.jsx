import { View, Text, SectionList, StyleSheet } from 'react-native';
import React from 'react';


const listItms = [
    {
        title: 'Fruits',
        data: [
            {id: 1, name: 'Apple'},
            {id: 2, name: 'Mango'},
            {id: 3, name: 'Banana'},
        ]
    },
    {
        title: 'Vegetables',
        data: [
            {id: 1, name: 'Carrot'},
            {id: 2, name: 'Potato'},
            {id: 3, name: 'Tomato'},
        ]
    },
];
const SectionListScreen = () => {
    const renderItem = ({item}) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );

    const renderSectionHeader = ({section}) => (
        <View style={styles.header}>
            <Text style={styles.HeaderTitle}>{section.title}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <SectionList 
                sections={listItms}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        paddingTop: 15,
    },
    list: {
        paddingHorizontal: 20,
    },
    item: {
        backgroundColor: '#add8e6',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#90ee90',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    HeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SectionListScreen;