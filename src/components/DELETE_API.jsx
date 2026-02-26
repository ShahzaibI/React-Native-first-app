import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const DELETE_API = () => {
  const [id, setId] = useState();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://10.0.2.2:3000/users/${id}`);
      console.log(response.data);
      setId('');
      Alert.alert('Success!', 'Data deleted successfully!');
    }
    catch (error) {
      Alert.alert('Error!', 'Failed to delete data.' + error);    
    }
  };
  return (
    <View>
        <Text style={{textAlign:'center', fontSize: 30, marginBottom: 10}}>DELETE_API</Text>

        <TextInput
          style={{fontSize: 20, borderColor: 'green', borderWidth: 2, margin: 10, padding: 10}}
          placeholder='Enter ID'
          onChangeText={(value) => setId(value)}
          value={id}
        />

        <Button title='Delete' onPress={handleDelete} />
        
    </View>
  );
};

export default DELETE_API;