import { View, Text, Pressable, StyleSheet  } from 'react-native';
import React from 'react';

const PressableComponent = () => {
    const handlePress = () => {
        console.log('Button Pressed!');
    };
    const handlePressIn = () => {
        console.log('Button Pressed In!');
    };
    const handlePressOut = () => {
        console.log('Button Pressed Out!');
    };
    const handlePressLong = () => {
        console.log('Button Pressed Long!');
    };
    return (
        <View style={styles.container}>
            <Pressable 
                style={styles.button} 
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onLongPress={handlePressLong}
                delayLongPress={5000} // call long press on 5 seconds the bydefault value is 500ms
            >
                <Text style={styles.buttonText}>Press Me</Text>
            </Pressable>
        </View>
    );
};

export default PressableComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});