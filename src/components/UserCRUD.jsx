import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from '../database/firestoreCRUD';

const UserCRUD = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const usersList = await getAllUsers();
            setUsers(usersList);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!name || !email || !phone) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setLoading(true);
            const userData = { name, email, phone };

            if (editingId) {
                await updateUser(editingId, userData);
                Alert.alert('Success', 'User updated successfully');
            } else {
                await createUser(userData);
                Alert.alert('Success', 'User created successfully');
            }

            clearForm();
            loadUsers();
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setEditingId(user.id);
    };

    const handleDelete = (userId) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this user?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setLoading(true);
                            await deleteUser(userId);
                            Alert.alert('Success', 'User deleted successfully');
                            loadUsers();
                        } catch (error) {
                            Alert.alert('Error', error.message);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setEditingId(null);
    };

    const renderUser = ({ item }) => {
        return (
            <View key={item.id} className="bg-white p-4 mb-3 rounded-lg">
                <Text className="text-lg font-bold mb-1">{item.name}</Text>
                <Text className="text-gray-600 mb-1">{item.email}</Text>
                <Text className="text-gray-600 mb-3">{item.phone}</Text>
                <View className="flex-row mt-2">
                    <TouchableOpacity className="bg-green-500 px-3 py-2 rounded mr-3" onPress={() => handleEdit(item)}>
                        <Text className="text-white font-bold text-center">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-red-500 px-3 py-2 rounded" onPress={() => handleDelete(item.id)}>
                        <Text className="text-white font-bold text-center">Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 p-5 bg-gray-100">
            <Text className="text-2xl font-bold text-center mb-5">User CRUD</Text>
            
            <View className="bg-white p-5 rounded-lg mb-5">
                <TextInput
                    className="border border-gray-300 p-3 mb-3 rounded"
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    className="border border-gray-300 p-3 mb-3 rounded"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    className="border border-gray-300 p-3 mb-3 rounded"
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                
                <View className="flex-row justify-between">
                    <TouchableOpacity 
                        className="bg-blue-500 p-4 rounded flex-1 mr-1" 
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text className="text-white text-center font-bold">
                            {editingId ? 'Update' : 'Create'} User
                        </Text>
                    </TouchableOpacity>
                    
                    {editingId && (
                        <TouchableOpacity className="bg-gray-500 p-4 rounded flex-1 ml-1" onPress={clearForm}>
                            <Text className="text-white text-center font-bold">Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={renderUser}
                className="flex-1"
                refreshing={loading}
                onRefresh={loadUsers}
            />
        </View>
    );
};

export default UserCRUD;