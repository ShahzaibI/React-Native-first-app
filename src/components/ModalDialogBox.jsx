import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';

const ModalDialogBox = () => {
    const [modalVisibal, setModalVisibal] = useState(false);
    console.log('Modal visible:', modalVisibal)
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.openButton}
                onPress={() => setModalVisibal(true)}
            >
                <Text style={styles.openButtonText}>Show Modal</Text>
            </TouchableOpacity>

            <Modal visible={modalVisibal} animationType='fade' transparent={true} onRequestClose={()=>setModalVisibal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Hello Modal</Text>
                        <Text style={styles.modalText}>This is Beautiful Modal</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisibal(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModalDialogBox;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    openButton:{
        backgroundColor: '#6200aa',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        elevation: 2,
    },
    openButtonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    modalOverlay:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView:{
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5, 
    },

    modalTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },

    modalText:{
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },

    closeButton:{
        backgroundColor: '#03dac3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 2,
    },
    closeButtonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});