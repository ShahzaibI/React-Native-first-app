import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@services/firebase';
import { User, AuthState } from '@types/index';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Fetch user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        set({
          user: {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: userData.name || '',
            department: userData.department || '',
            position: userData.position || '',
            joinDate: userData.joinDate || '',
            profileImage: userData.profileImage,
            salary: userData.salary,
          },
          isAuthenticated: true,
          loading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Login failed',
        loading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  signup: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user profile in Firestore
      const newUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: name,
        department: 'Engineering', // Default department
        position: 'Employee', // Default position
        joinDate: new Date().toISOString().split('T')[0],
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);

      set({
        user: newUser,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Signup failed',
        loading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Logout failed',
        loading: false,
      });
      throw error;
    }
  },

  updateUserProfile: async (updates: Partial<User>) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No user logged in');

    try {
      await setDoc(doc(db, 'users', currentUser.uid), updates, { merge: true });
      set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      }));
    } catch (error: any) {
      set({ error: error.message || 'Profile update failed' });
      throw error;
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            set({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                name: userData.name || '',
                department: userData.department || '',
                position: userData.position || '',
                joinDate: userData.joinDate || '',
                profileImage: userData.profileImage,
                salary: userData.salary,
              },
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    });

    return unsubscribe;
  },
}));
