import { create } from 'zustand';

// Static leave requests data for UI testing
const MOCK_LEAVE_REQUESTS = [
  {
    id: '1',
    userId: '1',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    type: 'vacation',
    reason: 'Family vacation',
    status: 'approved',
    createdAt: '2024-03-10T10:00:00Z',
    approvedBy: 'Manager',
    approvedAt: '2024-03-11T14:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    startDate: '2024-03-15',
    endDate: '2024-03-15',
    type: 'sick',
    reason: 'Medical appointment',
    status: 'pending',
    createdAt: '2024-03-12T09:15:00Z',
  },
  {
    id: '3',
    userId: '1',
    startDate: '2024-02-28',
    endDate: '2024-03-01',
    type: 'personal',
    reason: 'Personal matters',
    status: 'rejected',
    createdAt: '2024-02-25T16:20:00Z',
    rejectedBy: 'HR',
    rejectedAt: '2024-02-26T11:45:00Z',
    rejectionReason: 'Insufficient leave balance',
  },
  {
    id: '4',
    userId: '1',
    startDate: '2024-04-10',
    endDate: '2024-04-12',
    type: 'vacation',
    reason: 'Long weekend trip',
    status: 'withdrawn',
    createdAt: '2024-03-05T13:30:00Z',
  },
];

export const useLeaveStore = create((set) => ({
  requests: MOCK_LEAVE_REQUESTS,
  loading: false,
  error: null,

  fetchLeaveRequests: async (userId) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set({ 
        requests: MOCK_LEAVE_REQUESTS,
        loading: false 
      });
    }, 1000);
  },

  submitLeaveRequest: async (userId, startDate, endDate, type, reason) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      const newRequest = {
        id: Date.now().toString(),
        userId,
        startDate,
        endDate,
        type,
        reason,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      set((state) => ({
        requests: [newRequest, ...state.requests],
        loading: false,
      }));
    }, 1500);
  },

  withdrawRequest: async (requestId) => {
    set({ loading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set((state) => ({
        requests: state.requests.map((r) =>
          r.id === requestId ? { ...r, status: 'withdrawn' } : r
        ),
        loading: false,
      }));
    }, 1000);
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));