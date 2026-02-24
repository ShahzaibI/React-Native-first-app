import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const POST_API = () => {
    const [formData, setFormData] = useState({'id': '', 'name': '', 'email': ''});

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/users', formData);
            console.log(response.data);
            setFormData({'id': '', 'name': '', 'email': ''});
            Alert.alert('Success!', 'Data posted successfully!');
        }
        catch (error) {
            Alert.alert('Error!', 'Failed to post data.' + error);    
        }
    };
    return (
        <View>
            <Text style={{fontSize: 30, textAlign:'center', marginBottom: 10}}>POST_API</Text>

            <TextInput
                style={{fontSize: 20, borderColor: 'green', borderWidth: 2, margin: 10, padding: 10}}
                placeholder='Enter ID'
                onChangeText={(value) => handleInputChange('id', value)}
                value={formData.id}
            />
            <TextInput
                style={{fontSize: 20, borderColor: 'green', borderWidth: 2, margin: 10, padding: 10}}
                placeholder='Enter Name'
                onChangeText={(value) => handleInputChange('name', value)}
                value={formData.name}
            />
            <TextInput
                style={{fontSize: 20, borderColor: 'green', borderWidth: 2, margin: 10, padding: 10}}
                placeholder='Enter Email'
                onChangeText={(value) => handleInputChange('email', value)}
                value={formData.email}
            />

            <Button title='Submit' onPress={handleSubmit} />
        </View>
    );
};

export default POST_API;