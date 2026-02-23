import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Loader = () => {
    const [loader, setLoader] = useState(false);
    const toggleLoader = () => {
        setLoader(!loader);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleLoader} activeOpacity={0.7}>
                <Text style={styles.buttonText}>{loader? 'Hide Loader' : 'Show Loader'}</Text>
            </TouchableOpacity>
            {
                loader &&(
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size='large' color="#4CAF50" />
                        <Text style={styles.loaderText}>Loading...</Text>
                    </View>                    
                ) 
            }
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    loaderContainer:{
        height: 120,
        width: 120,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 5,
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '600',
    },
});