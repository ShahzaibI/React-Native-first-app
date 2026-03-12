import { create } from 'zustand';

// Static attendance data for UI testing
const MOCK_ATTENDANCE_RECORDS = [
  {
    id: '1',
    userId: '1',
    date: '2024-03-11',
    checkIn: '09:00',
    checkOut: '17:30',
    status: 'present',
    hoursWorked: 8.5,
  },
  {
    id: '2',
    userId: '1',
    date: '2024-03-10',
    checkIn: '08:45',
    checkOut: '17:15',
    status: 'present',
    hoursWorked: 8.5,
  },
  {
    id: '3',
    userId: '1',
    date: '2024-03-09',
    checkIn: '09:15',
    checkOut: '18:00',
    status: 'present',
    hoursWorked: 8.75,
  },
  {
    id: '4',
    userId: '1',
    date: '2024-03-08',
    checkIn: null,
    checkOut: null,
    status: 'absent',
    hoursWorked: 0,
  },
  {
    id: '5',
    userId: '1',
    date: '2024-03-07',
    checkIn: '09:00',
    checkOut: '17:30',
    status: 'present',
    hoursWorked: 8.5,
  },
];

export const useAttendanceStore = create((set) => ({
  records: MOCK_ATTENDANCE_RECORDS,
  loading: false,
  error: null,

  fetchAttendance: async (userId, month) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set({ 
        records: MOCK_ATTENDANCE_RECORDS,
        loading: false 
      });
    }, 1000);
  },

  checkIn: async (userId, checkInTime) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const newRecord = {
        id: Date.now().toString(),
        userId,
        date: today,
        checkIn: checkInTime,
        checkOut: null,
        status: 'present',
        hoursWorked: 0,
      };
      set((state) => ({
        records: [newRecord, ...state.records],
        loading: false,
      }));
    }, 1000);
  },

  checkOut: async (userId, recordId, checkOutTime) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set((state) => ({
        records: state.records.map((r) =>
          r.id === recordId 
            ? { ...r, checkOut: checkOutTime, hoursWorked: 8.5 } 
            : r
        ),
        loading: false,
      }));
    }, 1000);
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));