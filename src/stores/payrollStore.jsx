import { create } from 'zustand';

// Static payroll data for UI testing
const MOCK_PAYROLL_DATA = [
  {
    id: '1',
    userId: '1',
    month: 'March',
    year: 2024,
    baseSalary: 75000,
    overtime: 1200,
    bonus: 2000,
    allowances: 800,
    grossPay: 79000,
    taxDeductions: 15800,
    socialSecurity: 4900,
    healthInsurance: 300,
    otherDeductions: 200,
    totalDeductions: 21200,
    netPay: 57800,
    payDate: '2024-03-31',
    status: 'paid',
  },
  {
    id: '2',
    userId: '1',
    month: 'February',
    year: 2024,
    baseSalary: 75000,
    overtime: 800,
    bonus: 0,
    allowances: 800,
    grossPay: 76600,
    taxDeductions: 15320,
    socialSecurity: 4750,
    healthInsurance: 300,
    otherDeductions: 200,
    totalDeductions: 20570,
    netPay: 56030,
    payDate: '2024-02-29',
    status: 'paid',
  },
  {
    id: '3',
    userId: '1',
    month: 'January',
    year: 2024,
    baseSalary: 75000,
    overtime: 1500,
    bonus: 5000,
    allowances: 800,
    grossPay: 82300,
    taxDeductions: 16460,
    socialSecurity: 5100,
    healthInsurance: 300,
    otherDeductions: 200,
    totalDeductions: 22060,
    netPay: 60240,
    payDate: '2024-01-31',
    status: 'paid',
  },
  {
    id: '4',
    userId: '1',
    month: 'December',
    year: 2023,
    baseSalary: 75000,
    overtime: 600,
    bonus: 3000,
    allowances: 800,
    grossPay: 79400,
    taxDeductions: 15880,
    socialSecurity: 4920,
    healthInsurance: 300,
    otherDeductions: 200,
    totalDeductions: 21300,
    netPay: 58100,
    payDate: '2023-12-31',
    status: 'paid',
  },
];

export const usePayrollStore = create((set) => ({
  payrolls: MOCK_PAYROLL_DATA,
  currentPayroll: MOCK_PAYROLL_DATA[0],
  loading: false,
  error: null,

  fetchPayrolls: async (userId) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set({ 
        payrolls: MOCK_PAYROLL_DATA,
        loading: false 
      });
    }, 1000);
  },

  fetchPayrollDetail: async (payrollId) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      const payroll = MOCK_PAYROLL_DATA.find(p => p.id === payrollId);
      set({
        currentPayroll: payroll || null,
        loading: false,
        error: payroll ? null : 'Payroll record not found',
      });
    }, 800);
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));