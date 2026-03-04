import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageExample = () => {
    const [username, setUsername] = useState('');
    const [storedUsername, setStoredUserName] = useState('');

    const saveUserName = async () => {
        await AsyncStorage.setItem('username', username);
        setUsername('');
        Alert.alert('Username saved successfully');
    }

    const getUserName = async () => {
        const savedUserName = await AsyncStorage.getItem('username');
        if(savedUserName){
            setStoredUserName(savedUserName);
        }
        else{
            Alert.alert('No username found');
        }
    }

    const removeUserName = async () => {
        await AsyncStorage.removeItem('username');
        setStoredUserName('');
        Alert.alert('Username removed successfully');
    }

    useEffect(() => {
        getUserName();
    }, [])

    return (
        <View>
            <TextInput placeholder='Enter username' 
                value={username}
                onChangeText={setUsername}
            />
            <Button title='Save UserName' onPress={saveUserName} />
            <Button title='Get UserName' onPress={getUserName}/>
            <Button title='Remove UserName' onPress={removeUserName}/>
            <Text>Username: {storedUsername}</Text>
        </View>
    );
};

export default AsyncStorageExample;