import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import First from './First'


const JSX = () => {
   return (
       <View style={styles.container}>
            <Text style={styles.title}>My First App</Text>
            <Button title='Press Here' color='#007AFF'/>
            <First/>
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
});

export default JSX;