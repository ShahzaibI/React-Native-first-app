import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

const Login = ({navigation}) => { // This navigation param always with this name we cannot change this
    const [username, setUserName] = useState('');
    return (
        <View>
            <Text>Login</Text>
            <TextInput placeholder='Enter username' style={{marginVertical: 15, fontSize: 15, borderWidth: 1, borderColor: 'green'}} onChangeText={setUserName} />
            {/*We can pass data to other component in navigation */}
            {/* <Button title='Login' onPress={()=> navigation.navigate('About', {username: 'Shahzaib', age: 22})}/>  */}
            <Button title='Login' onPress={()=> navigation.navigate('About', {username})}/> 
            {/* If user key name varibale name is same then no need to pass the key explicitly like username: username in above*/}
                
        </View>
    );
};
export default Login;