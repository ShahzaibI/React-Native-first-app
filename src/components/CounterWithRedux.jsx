import { View, Text, Button } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset } from '../redux/slice/counterSlice';

const CounterWithRedux = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch(); // this is use fir calling the reduce and reduce take the action and perform action base on this action
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold', marginBottom:30}}>Redux installation and configuration</Text>
            <Text>Count: {count}</Text>
            <View style={{margin: 10}}>
                <Button title='Increment' onPress={()=>dispatch(increment())}/>
            </View>
            <View style={{margin: 10}}>
                <Button title='Decrement' onPress={()=>dispatch(decrement())}/>
            </View>
            <View style={{margin: 10}}>
                <Button title='Reset' onPress={()=>dispatch(reset())}/>
            </View>
        </View>
    );
};

export default CounterWithRedux;