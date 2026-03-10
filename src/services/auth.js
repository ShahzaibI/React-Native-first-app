import auth from '@react-native-firebase/auth'

export const registerUser = async (email, password) => {
    try{
        const userCredenial = await auth().createUserWithEmailAndPassword(email, password);
        await userCredenial.user.sendEmailVerification();
        return userCredenial.user;
    }
    catch(error){
        let errorMessage;

        switch(error.code){
            case 'auth/email-already-in-use':
                errorMessage = 'That email address is already in use!';
                break;
            case 'auth/invalid-email':
                errorMessage = 'That email address is invalid!';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }

        throw new Error(errorMessage);
    }
}

export const loginUser = async (email, password) => {
    try{
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        return {user, emailVerified: user.emailVerified};
    }
    catch(error){
        let errorMessage;

        switch(error.code){
            case 'auth/invalid-email':
                errorMessage = 'That email address is invalid!';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled!';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email!';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password!';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }

        throw new Error(errorMessage);
    }
}


export const resetPassword = async (email) => {
    try{
        await auth().sendPasswordResetEmail(email);
    }
    catch(error){
        let errorMessage;

        switch(error.code){
            case 'auth/invalid-email':
                errorMessage = 'That email address is invalid!';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email!';
                break;
            default:
                errorMessage = 'Something went wrong, please try again later';
        }

        throw new Error(errorMessage);
    }
}