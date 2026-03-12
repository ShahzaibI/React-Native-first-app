import { create } from 'zustand';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@services/firebase';
import { LeaveRequest } from '@types/index';

interface LeaveStore {
  requests: LeaveRequest[];
  loading: boolean;
  error: string | null;
  fetchLeaveRequests: (userId: string) => Promise<void>;
  submitLeaveRequest: (
    userId: string,
    startDate: string,
    endDate: string,
    type: LeaveRequest['type'],
    reason: string
  ) => Promise<void>;
  withdrawRequest: (requestId: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLeaveStore = create<LeaveStore>((set) => ({
  requests: [],
  loading: false,
  error: null,

  fetchLeaveRequests: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const q = query(collection(db, 'leaveRequests'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const leaveRequests = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as LeaveRequest[];
      set({ requests: leaveRequests, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch leave requests',
        loading: false,
      });
    }
  },

  submitLeaveRequest: async (
    userId: string,
    startDate: string,
    endDate: string,
    type: LeaveRequest['type'],
    reason: string
  ) => {
    set({ loading: true, error: null });
    try {
      const newRequest = {
        userId,
        startDate,
        endDate,
        type,
        reason,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, 'leaveRequests'), newRequest);
      set((state) => ({
        requests: [...state.requests, { ...newRequest, id: docRef.id }],
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to submit leave request',
        loading: false,
      });
    }
  },

  withdrawRequest: async (requestId: string) => {
    set({ loading: true, error: null });
    try {
      const requestRef = doc(db, 'leaveRequests', requestId);
      await updateDoc(requestRef, { status: 'withdrawn' });
      set((state) => ({
        requests: state.requests.map((r) =>
          r.id === requestId ? { ...r, status: 'withdrawn' } : r
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to withdraw request',
        loading: false,
      });
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
