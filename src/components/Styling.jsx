import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import styles from '../style/style'

const Styling = () => {
    return (
        <View>
            <Text style={{fontSize: 30, color: 'white', backgroundColor: 'red'}}>Inline Styling</Text>
            <Text style={style.text}>Internal Styling</Text>
            <Text style={styles.text}>External Styling</Text>
            <Text style={[styles.text, style.text, {backgroundColor: 'red'}]}>Mix Styling</Text>
            {/* The precedence of inline styling is 1, internal styling is 2, external styling is 3*/}
        </View>
    );
};

const style = StyleSheet.create({
    text:{
        fontSize: 30, 
        color: 'white', 
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'lightgreen',
        padding: 6,
        marginVertical: 10,
    },
});

export default Styling;