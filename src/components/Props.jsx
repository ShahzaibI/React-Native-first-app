import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import Child from './Child';

const Props = () => {
    const [count, setCount] = useState(0);
    const [item, setItem] = useState(1);
    return (
        <View>
            <Text style={{fontSize: 30}}>Props</Text>
            <Button title='Increment' onPress={()=> setCount(count+1)}/>
            <Button title='Decrement' onPress={()=> setCount(count-1)}/>
            <Button title='Item' onPress={()=> setItem(item*10)}/>
            <Child data={count} item={item} />
        </View>
    );
};

export default Props;