import { create } from 'zustand';

// Static user data for UI testing
const MOCK_USER = {
  id: '1',
  email: 'john.doe@company.com',
  name: 'John Doe',
  department: 'Engineering',
  position: 'Senior Developer',
  joinDate: '2023-01-15',
  profileImage: 'https://via.placeholder.com/150',
  salary: 75000,
};

export const useAuthStore = create((set) => ({
  user: MOCK_USER,
  loading: false,
  error: null,
  isAuthenticated: true,

  login: async (email, password) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set({
        user: MOCK_USER,
        isAuthenticated: true,
        loading: false,
      });
    }, 1000);
  },

  signup: async (email, password, name) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      const newUser = {
        ...MOCK_USER,
        email,
        name,
      };
      set({
        user: newUser,
        isAuthenticated: true,
        loading: false,
      });
    }, 1000);
  },

  logout: async () => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }, 500);
  },

  updateUserProfile: async (updates) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
        loading: false,
      }));
    }, 1000);
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  initializeAuth: () => {
    // Mock initialization - user is already logged in
    set({
      user: MOCK_USER,
      isAuthenticated: true,
    });
  },
}));