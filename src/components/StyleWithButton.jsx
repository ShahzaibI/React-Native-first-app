import { View, Text, TouchableHighlight, TouchableOpacity, Button, StyleSheet } from 'react-native';
import React from 'react';

const StyleWithButton = () => {
    return (
        <View>
            <Button title='Basic Button' color={'red'}/>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.ButtonText}>Touchable Opacity</Text>
            </TouchableOpacity>
            <TouchableHighlight style={styles.button} onPress={() => console.log('Pressed')} underlayColor={'#3A1078'}>
                <Text style={styles.ButtonText}>Touchable Highlight</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 20,
        padding: 20,
        backgroundColor: '#4E31AA',
        borderRadius: 5,
        elevation: 5,
        borderRadius: 25,
    },
    ButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default StyleWithButton;