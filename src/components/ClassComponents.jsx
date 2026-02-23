import { View, Text } from 'react-native';
import React, { Component } from "react";
import SecondClass from './SecondClass';

class ClassComponents extends Component {

    render() {
        const age = 24;
        return <View>
            <Text style={{fontSize: 30}}>Hello Class Components</Text>
            <SecondClass data={age} />
        </View>;
    }
}

export default ClassComponents;
