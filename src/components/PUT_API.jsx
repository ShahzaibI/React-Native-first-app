import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const PUT_API = () => {

    const [formData, setFormData] = useState({'id': '', 'name': '', 'email': ''});

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://10.0.2.2:3000/users/${formData.id}`, {
                name: formData.name,
                // email: formData.email
            });
            console.log(response.data);
            setFormData({'id': '', 'name': '', 'email': ''});
            Alert.alert('Success!', 'Data updated successfully!');
        }
        catch (error) {
            Alert.alert('Error!', 'Failed to update data.' + error);    
        }
    };

    return (
        <View>
            <Text style={{textAlign:'center', fontSize: 30, marginBottom: 10}}>PUT_API</Text>

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

            <Button title='Update' onPress={handleUpdate} />
        </View>
    );
};

export default PUT_API;