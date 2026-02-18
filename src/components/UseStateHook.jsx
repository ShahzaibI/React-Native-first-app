import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';

const UseStateHook = () => {
    const [name, setName] = useState('Shahzaib');

    const uppdateName = (name) => {
        setName(name);
    };

    return (
        <View>
            <Text style= {{fontSize: 30}}>UseStateHook</Text>
            <Text style= {{fontSize: 30}}>Name: {name}</Text>
            {/* <Button title="Chnage Name" onPress={() => setName(name === 'Shahzaib' ? 'Haider' : 'Shahzaib')} /> */}
            <Button title="Chnage Name" onPress={() => uppdateName(name === 'Shahzaib' ? 'Haider' : 'Shahzaib')} />
        </View>
    );
};

export default UseStateHook;