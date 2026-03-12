import { create } from 'zustand';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@services/firebase';
import { PayrollInfo } from '@types/index';

interface PayrollStore {
  payrolls: PayrollInfo[];
  currentPayroll: PayrollInfo | null;
  loading: boolean;
  error: string | null;
  fetchPayrolls: (userId: string) => Promise<void>;
  fetchPayrollDetail: (payrollId: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePayrollStore = create<PayrollStore>((set) => ({
  payrolls: [],
  currentPayroll: null,
  loading: false,
  error: null,

  fetchPayrolls: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const q = query(collection(db, 'payroll'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const payrollData = snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => {
          // Sort by year descending, then month descending
          if (b.year !== a.year) return b.year - a.year;
          return b.month.localeCompare(a.month);
        }) as PayrollInfo[];
      set({ payrolls: payrollData, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch payroll information',
        loading: false,
      });
    }
  },

  fetchPayrollDetail: async (payrollId: string) => {
    set({ loading: true, error: null });
    try {
      const payrollRef = doc(db, 'payroll', payrollId);
      const payrollDoc = await getDoc(payrollRef);
      if (payrollDoc.exists()) {
        set({
          currentPayroll: {
            ...payrollDoc.data(),
            id: payrollDoc.id,
          } as PayrollInfo,
          loading: false,
        });
      } else {
        set({
          error: 'Payroll record not found',
          loading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch payroll detail',
        loading: false,
      });
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
