// Simple utility functions for the app

export const formatDate = (dateString, format = 'default') => {
  const date = new Date(dateString);
  
  if (format === 'EEE, MMM dd') {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: '2-digit' 
    });
  }
  
  return date.toLocaleDateString();
};

export const formatTime = (timeString) => {
  return timeString || '--:--';
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'present': return '#10b981';
    case 'absent': return '#ef4444';
    case 'late': return '#f59e0b';
    case 'half_day': return '#8b5cf6';
    case 'approved': return '#10b981';
    case 'pending': return '#f59e0b';
    case 'rejected': return '#ef4444';
    case 'withdrawn': return '#6b7280';
    default: return '#6b7280';
  }
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 'present': return 'Present';
    case 'absent': return 'Absent';
    case 'late': return 'Late';
    case 'half_day': return 'Half Day';
    case 'approved': return 'Approved';
    case 'pending': return 'Pending';
    case 'rejected': return 'Rejected';
    case 'withdrawn': return 'Withdrawn';
    default: return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const formatCurrency = (amount) => {
  return `$${amount.toLocaleString()}`;
};

export const calculateWorkingDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  
  while (start <= end) {
    const dayOfWeek = start.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      count++;
    }
    start.setDate(start.getDate() + 1);
  }
  
  return count;
};