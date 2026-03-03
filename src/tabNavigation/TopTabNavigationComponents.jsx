import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat Screen</Text>
        </View>
    );
};

const StatusScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Status Screen</Text>
        </View>
    );
};

const CallsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calls Screen</Text>
        </View>
    );
};

export { ChatScreen, StatusScreen, CallsScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#343a40',
    },
});