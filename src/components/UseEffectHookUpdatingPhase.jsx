import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

const UseEffectHookUpdatingPhase = () => {
    const [count, setCount] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        console.log('count UseEffect Called');
    },[count]);
    useEffect(() => {
        console.log('Score UseEffect Called');
    },[score]);
    
    return (
        <View>
            <Text style={{fontSize: 30, marginBottom: 10}}>UseEffectHookUpdatingPhase</Text>
            <Text style={{fontSize: 30, marginBottom: 10}}>Counter: {count}</Text>
            <Text style={{fontSize: 30, marginBottom: 10}}>Score: {score}</Text>
            <Button title='Counter' onPress={() => setCount(count + 1)} />
            <Button title='Score' onPress={() => setScore(score + 1)} />
            <PropComponent count={count} score={score} />
        </View>
    );
};

const PropComponent = ({count, score}) => {
    

    useEffect(() => {
        console.log('prop count useEffect call');
    },[count]);
    useEffect(() => {
        console.log('prop Score UseEffect Called');
    },[score]);

    return (
        <View>
            <Text style={{fontSize: 30, marginBottom: 10}}>UseEffectHookUpdatingPhase</Text>
            <Text style={{fontSize: 30, marginBottom: 10}}>Counter: {count}</Text>
            <Text style={{fontSize: 30, marginBottom: 10}}>Score: {score}</Text>
        </View>
    );
};

export default UseEffectHookUpdatingPhase;