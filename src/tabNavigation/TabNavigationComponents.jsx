import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
        </View>
    );
};

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
        </View>
    );
};

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Setting Screen</Text>
        </View>
    );
};

export { HomeScreen, ProfileScreen, SettingScreen };

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