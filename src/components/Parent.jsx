import { View, Text } from 'react-native';
import React, { createContext, useState } from 'react';
import ChildComp from './ChildComp';

export const CounterContext = createContext();

const Parent = () => {
    const [count, setCount] = useState(0);
    const countIncrement = () => {
        setCount(count + 1)
    };
    return (
        <CounterContext.Provider value={{count, countIncrement}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ChildComp />
            </View>
        </CounterContext.Provider>
    );
};

export default Parent;