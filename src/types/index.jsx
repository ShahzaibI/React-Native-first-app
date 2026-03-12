// Static type definitions for UI components
export const UserTypes = {
  EMPLOYEE: 'employee',
  MANAGER: 'manager',
  HR: 'hr',
};

export const LeaveTypes = {
  VACATION: 'vacation',
  SICK: 'sick',
  PERSONAL: 'personal',
  EMERGENCY: 'emergency',
};

export const LeaveStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
};

export const AttendanceStatus = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  HALF_DAY: 'half_day',
};

// Mock user structure
export const mockUser = {
  id: '1',
  email: 'john.doe@company.com',
  name: 'John Doe',
  department: 'Engineering',
  position: 'Senior Developer',
  joinDate: '2023-01-15',
  profileImage: 'https://via.placeholder.com/150',
  salary: 75000,
};