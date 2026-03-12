import { format, parseISO, isToday, isYesterday } from 'date-fns';

export const formatDate = (date: string | Date, formatStr = 'MMM dd, yyyy') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatTime = (time: string) => {
  try {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch {
    return time;
  }
};

export const getDateLabel = (date: string) => {
  const dateObj = parseISO(date);
  if (isToday(dateObj)) return 'Today';
  if (isYesterday(dateObj)) return 'Yesterday';
  return formatDate(date);
};

export const calculateDaysBetween = (startDate: string, endDate: string) => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end dates
};

export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    present: '#10b981',
    absent: '#ef4444',
    late: '#f59e0b',
    'half-day': '#8b5cf6',
    approved: '#10b981',
    rejected: '#ef4444',
    pending: '#f59e0b',
    paid: '#10b981',
    processed: '#6366f1',
  };
  return colors[status] || '#64748b';
};

export const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    'half-day': 'Half Day',
    approved: 'Approved',
    rejected: 'Rejected',
    pending: 'Pending',
    paid: 'Paid',
    processed: 'Processed',
  };
  return labels[status] || status;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
