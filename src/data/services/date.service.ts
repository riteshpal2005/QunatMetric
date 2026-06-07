/**
 * Date Service
 * 
 * An abstraction layer for handling dates.
 * If we ever want to switch from native Date to dayjs or date-fns,
 * we only have to change it in this one file.
 */

export const DateService = {
  getCurrentTimestamp: (): number => {
    return Date.now();
  },

  formatToReadableDate: (isoString: string): string => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  },
  
  isExpired: (timestamp: number, expirationMs: number): boolean => {
    return Date.now() - timestamp > expirationMs;
  }
};
