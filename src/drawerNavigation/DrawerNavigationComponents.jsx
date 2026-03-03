import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';

const HomeComp = ({navigation}) => {
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.title}>Home Screen</Text>
            <Button title='Open Drawer' onPress={() => navigation.openDrawer()}/>
        </View>
    );
};

const Profile = ({navigation}) => {
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.title}>Profile Screen</Text>
            <Button title='Open Drawer' onPress={() => navigation.openDrawer()}/>
        </View>
    );
};

const Settings = ({navigation}) => {
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.title}>Settings Screen</Text>
            <Button title='Open Drawer' onPress={() => navigation.openDrawer()}/>
        </View>
    );
};


export { HomeComp, Profile, Settings };

const styles = StyleSheet.create({
    screenContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});