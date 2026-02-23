import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

const UseEffectHook = () => {

    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('UseEffect Called');
    },[]); //,[] when we pass this array dependency its mens only one time when this component is mount then this useeffect call just one time.
    
    return (
        <View>
            <Text style={{fontSize: 30}}>UseEffectHook</Text>
            <Text style={{fontSize: 30}}>Count: {count}</Text>
            <Button title='Counter' onPress={() => setCount(count + 1)} />
        </View>
    );
};

export default UseEffectHook;