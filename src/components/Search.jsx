import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Search = () => {
    const [searchData, setSearchData] = useState('');

    const contactList = [
        {
            id: 1,
            name: 'Shahzaib',
        },
        {
            id: 2,
            name: 'Haider',
        },
        {
            id: 3,
            name: 'Danial',
        },
        {
            id: 4,
            name: 'Waqar',
        },
        {
            id: 5,
            name: 'Haris',
        },
    ];

    const filteredData = contactList.filter((item) => item.name.toLowerCase().includes(searchData.toLowerCase()))

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact List</Text>
            <TextInput 
                placeholder='Search Contact' 
                value={searchData} 
                onChangeText={(val) => setSearchData(val)} 
                placeholderTextColor="#888"
                style={styles.searchBar}
            />
            <FlatList 
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#e3f2fd',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#1e88e5',
    },
    searchBar:{
        height: 40,
        borderColor: '#90caf9',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    list:{
        paddingBottom: 20,
    },
    item:{
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text:{
        fontSize: 18,
        color: '#424242',
    },
});