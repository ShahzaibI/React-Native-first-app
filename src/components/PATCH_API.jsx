import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const PATCH_API = () => {

    const [formData, setFormData] = useState({'id': '', 'name': '', 'email': ''});

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`http://10.0.2.2:3000/users/${formData.id}`, {
                ...formData.name && {name: formData.name}, //...formData.name this is use for identify that the value is changed or not if changed then add this in request data otherwise not.
                ...formData.email && {email: formData.email}
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
            <Text style={{textAlign:'center', fontSize: 30, marginBottom: 10}}>PATCH_API</Text>

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

export default PATCH_API;