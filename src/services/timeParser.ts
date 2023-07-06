import dayjs from 'dayjs';

export const dateParser = (date: string) => {
  const itemDate = dayjs(date).format('YYYY-MM-DD');
  const diffDays = dayjs().diff(itemDate, 'day');
  if (diffDays < 1) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays <= 7) {
    return 'Week ago';
  }
  return `${itemDate}`;
};
