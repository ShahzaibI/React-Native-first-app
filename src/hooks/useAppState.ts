import { useAuthStore } from '@stores/authStore';
import { useAttendanceStore } from '@stores/attendanceStore';
import { useLeaveStore } from '@stores/leaveStore';
import { usePayrollStore } from '@stores/payrollStore';

/**
 * Custom hook to access all app stores
 * Provides centralized access to auth, attendance, leave, and payroll state
 */
export function useAppState() {
  const auth = useAuthStore();
  const attendance = useAttendanceStore();
  const leave = useLeaveStore();
  const payroll = usePayrollStore();

  return {
    auth,
    attendance,
    leave,
    payroll,
  };
}

/**
 * Custom hook for loading state across multiple operations
 */
export function useIsLoading() {
  const { auth, attendance, leave, payroll } = useAppState();
  
  return (
    auth.loading ||
    attendance.loading ||
    leave.loading ||
    payroll.loading
  );
}

/**
 * Custom hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { isAuthenticated, user } = useAuthStore();
  return isAuthenticated && !!user;
}

/**
 * Custom hook to get current user
 */
export function useCurrentUser() {
  const { user } = useAuthStore();
  return user;
}
