import firestore from "@react-native-firebase/firestore";

const USERS_COLLECTION = 'users';

export const createUser = async (userData) => {
    try {
        const docRef = await firestore().collection(USERS_COLLECTION).add(userData);
        return { success: true, id: docRef.id };
    } catch (error) {
        let errorMessage;
        
        switch (error.code) {
            case 'firestore/permission-denied':
                errorMessage = 'Permission denied to create user!';
                break;
            case 'firestore/unavailable':
                errorMessage = 'Service temporarily unavailable!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};

export const getAllUsers = async () => {
    try {
        const snapshot = await firestore().collection(USERS_COLLECTION).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        let errorMessage;
        
        switch (error.code) {
            case 'firestore/permission-denied':
                errorMessage = 'Permission denied to read users!';
                break;
            case 'firestore/unavailable':
                errorMessage = 'Service temporarily unavailable!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};

export const getUser = async (userId) => {
    try {
        const doc = await firestore().collection(USERS_COLLECTION).doc(userId).get();
        
        if (!doc.exists) {
            throw new Error('User not found!');
        }
        
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        let errorMessage;
        
        if (error.message === 'User not found!') {
            throw error;
        }
        
        switch (error.code) {
            case 'firestore/permission-denied':
                errorMessage = 'Permission denied to read user!';
                break;
            case 'firestore/unavailable':
                errorMessage = 'Service temporarily unavailable!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};

export const updateUser = async (userId, updateData) => {
    try {
        await firestore().collection(USERS_COLLECTION).doc(userId).update(updateData);
        return { success: true };
    } catch (error) {
        let errorMessage;
        
        switch (error.code) {
            case 'firestore/not-found':
                errorMessage = 'User not found!';
                break;
            case 'firestore/permission-denied':
                errorMessage = 'Permission denied to update user!';
                break;
            case 'firestore/unavailable':
                errorMessage = 'Service temporarily unavailable!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};

export const deleteUser = async (userId) => {
    try {
        await firestore().collection(USERS_COLLECTION).doc(userId).delete();
        return { success: true };
    } catch (error) {
        let errorMessage;
        
        switch (error.code) {
            case 'firestore/permission-denied':
                errorMessage = 'Permission denied to delete user!';
                break;
            case 'firestore/unavailable':
                errorMessage = 'Service temporarily unavailable!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};