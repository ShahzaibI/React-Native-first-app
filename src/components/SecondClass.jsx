import { Button, Text, View } from 'react-native';
import React, { Component } from 'react';

class SecondClass extends Component {
    constructor(){
        super();
        this.state = {
            name: "Shahzaib",  
        };
    }

    updateName = () => {
        this.setState({name: this.state.name == 'Shahzaib'? 'Haider' : 'Shahzaib'});
    }
    
    render() {
        return (
            <View>
                <Text style={{fontSize: 20}}>Name: {this.state.name}</Text>
                <Text style={{fontSize: 20}}>Age: {this.props.data}</Text>
                <Button title="Change Name" onPress={this.updateName} />
            </View>
        );
    }
}

export default SecondClass;