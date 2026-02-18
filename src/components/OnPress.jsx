import { View, Text, Button, UseState } from 'react-native';
import React from 'react';

const OnPress = () => {
    
    let name = 'Shahzaib';
    const getName = () => {
        name = 'Rizwan';
        console.info('Name: ', name);
    }
    return (
        <View>
            <Text style= { {fontSize: 30} }>{name}</Text>
            <Button title='Press' onPress={getName}  /> 
            {/* <Button title='Press' onPress={() => getName('Shahzaib')}  /> */}
        </View>
    );
};

export default OnPress;