const getTransformedDay = (date: Date) => {
  // eslint-disable-next-line no-magic-numbers -- This is disabled to allow date extraction
  const day = date.getDate().toString().padStart(2, '0'); // padStart(2, '0') -- Ensures that the day is always two characters long
  const month = date.toLocaleString('en-GB', { month: 'short' });

  return `${day} ${month}`;
};

export const transformEventDate = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startDay = getTransformedDay(startDate);
  const endDay = getTransformedDay(endDate);

  if (startDay === endDay) {
    return [startDay];
  }

  return [startDay, endDay];
};
