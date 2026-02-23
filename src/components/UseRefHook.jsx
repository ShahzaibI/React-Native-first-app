import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef } from 'react';

const UseRefHook = () => {
    const myRef = useRef();

    const handleRef = () => {
        myRef.current.setNativeProps({
            text: 'Hello World!',
            style: {
                color: 'white',
                backgroundColor: 'crimson'
            }
        });
        myRef.current.focus();
    }
    return (
        <View style={styles.container}>
            <TextInput
                ref={myRef}
                style={styles.input}
                placeholder='Enter Your Text'
                placeholderTextColor='#999'
            />

            <TouchableOpacity style={styles.button} onPress={handleRef}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UseRefHook;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});