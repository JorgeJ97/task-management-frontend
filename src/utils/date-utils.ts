export const parseDateSafe = (dateString: string | Date | null | undefined): Date | undefined => {
  if (!dateString) return undefined;
  if (dateString instanceof Date) return dateString;
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? undefined : date;
};