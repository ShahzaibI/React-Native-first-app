import database from "@react-native-firebase/database";

const USERS_REF = 'users';

export const createUser = async (userData) => {
    try {
        const newUserRef = database().ref(USERS_REF).push();
        await newUserRef.set(userData);
        return { success: true, id: newUserRef.key };
    } catch (error) {
        let errorMessage;
        
        switch (error.code) {
            case 'database/permission-denied':
                errorMessage = 'Permission denied to create user!';
                break;
            case 'database/network-request-failed':
                errorMessage = 'Network error, please try again!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};

export const getAllUsers = async () => {
    try {
        const snapshot = await database().ref(USERS_REF).once('value');
        const users = [];
        snapshot.forEach(child => {
            users.push({ id: child.key, ...child.val() });
        });
        return users;
    } catch (error) {
        let errorMessage;
        
        switch (error.code) {
            case 'database/permission-denied':
                errorMessage = 'Permission denied to read users!';
                break;
            case 'database/network-request-failed':
                errorMessage = 'Network error, please try again!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};

export const getUser = async (userId) => {
    try {
        const snapshot = await database().ref(`${USERS_REF}/${userId}`).once('value');
        
        if (!snapshot.exists()) {
            throw new Error('User not found!');
        }
        
        return { id: snapshot.key, ...snapshot.val() };
    } catch (error) {
        if (error.message === 'User not found!') {
            throw error;
        }
        
        let errorMessage;
        
        switch (error.code) {
            case 'database/permission-denied':
                errorMessage = 'Permission denied to read user!';
                break;
            case 'database/network-request-failed':
                errorMessage = 'Network error, please try again!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};

export const updateUser = async (userId, updateData) => {
    try {
        await database().ref(`${USERS_REF}/${userId}`).update(updateData);
        return { success: true };
    } catch (error) {
        let errorMessage;
        
        switch (error.code) {
            case 'database/permission-denied':
                errorMessage = 'Permission denied to update user!';
                break;
            case 'database/network-request-failed':
                errorMessage = 'Network error, please try again!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};

export const deleteUser = async (userId) => {
    try {
        await database().ref(`${USERS_REF}/${userId}`).remove();
        return { success: true };
    } catch (error) {
        let errorMessage;
        
        switch (error.code) {
            case 'database/permission-denied':
                errorMessage = 'Permission denied to delete user!';
                break;
            case 'database/network-request-failed':
                errorMessage = 'Network error, please try again!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }
        
        throw new Error(errorMessage);
    }
};