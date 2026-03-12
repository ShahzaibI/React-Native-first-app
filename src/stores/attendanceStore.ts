import { create } from 'zustand';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@services/firebase';
import { AttendanceRecord } from '@types/index';

interface AttendanceStore {
  records: AttendanceRecord[];
  loading: boolean;
  error: string | null;
  fetchAttendance: (userId: string, month: string) => Promise<void>;
  checkIn: (userId: string, checkInTime: string) => Promise<void>;
  checkOut: (userId: string, recordId: string, checkOutTime: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  records: [],
  loading: false,
  error: null,

  fetchAttendance: async (userId: string, month: string) => {
    set({ loading: true, error: null });
    try {
      const q = query(
        collection(db, 'attendance'),
        where('userId', '==', userId),
        where('date', '>=', `${month}-01`),
        where('date', '<', `${month}-32`)
      );
      const snapshot = await getDocs(q);
      const attendanceRecords = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as AttendanceRecord[];
      set({ records: attendanceRecords, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch attendance',
        loading: false,
      });
    }
  },

  checkIn: async (userId: string, checkInTime: string) => {
    set({ loading: true, error: null });
    try {
      const today = new Date().toISOString().split('T')[0];
      const newRecord = {
        userId,
        date: today,
        checkIn: checkInTime,
        status: 'present' as const,
      };
      await addDoc(collection(db, 'attendance'), newRecord);
      set((state) => ({
        records: [...state.records, { ...newRecord, id: 'temp' }],
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Check-in failed',
        loading: false,
      });
    }
  },

  checkOut: async (userId: string, recordId: string, checkOutTime: string) => {
    set({ loading: true, error: null });
    try {
      const recordRef = doc(db, 'attendance', recordId);
      await updateDoc(recordRef, { checkOut: checkOutTime });
      set((state) => ({
        records: state.records.map((r) =>
          r.id === recordId ? { ...r, checkOut: checkOutTime } : r
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Check-out failed',
        loading: false,
      });
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
